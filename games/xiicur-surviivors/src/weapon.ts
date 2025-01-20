import { cam } from "./cam"
import { addPhysicsComp } from "./components/physics"
import { addRenderComp } from "./components/render"
import {
    BULLET_SPEED,
    INIT_BULLET_FIRE_RATE,
    BULLET_AGE,
    LGREEN,
    INIT_AURA_DAMAGE_RATE,
    MAX_AURA_RADIUS,
    MAX_ORBS_NUM,
    INIT_SABER_FIRE_RATE,
    SABER_SPEED,
    SABER_AGE,
    SABER_CHARGE_TIME,
    ORB_CHARGE_TIME,
    WIDTH,
    HEIGHT,
    ORB_SPIN_SPEED,
} from "./const"
import { ticker } from "./core/interpolation"
import { aabb, angleToVec, distance, rand, randInt } from "./core/math"
import { hero } from "./hero"
import {
    attackMob,
    isHittingMob,
    iterMobs,
    MOB_SIZE,
    nearestMobPos,
} from "./mob"
import { playShoot } from "./sound"
import { stats } from "./stat"

const bullets = {
    x: [] as number[],
    y: [] as number[],
    // direction vector(angle)
    dirx: [] as number[],
    diry: [] as number[],
    age: [] as number[],
    active: [] as boolean[],
}
let bulletFreePool: number[] = []
const SIZE = 8
const bulletFireRate = ticker(INIT_BULLET_FIRE_RATE)
const auraDmgRate = ticker(INIT_AURA_DAMAGE_RATE)

const sabers = {
    x: [] as number[],
    y: [] as number[],
    // direction vector(angle)
    dirx: [] as number[],
    diry: [] as number[],
    age: [] as number[],
    charge: [] as number[],
    active: [] as boolean[],
}
let saberFreePool: number[] = []
const saberFireRate = ticker(INIT_SABER_FIRE_RATE)

const AURA_PARTICLES_AGE = 500
const auraParticles = {
    x: Array(~~MAX_AURA_RADIUS).fill(0),
    y: Array(~~MAX_AURA_RADIUS).fill(0),
    age: Array(~~MAX_AURA_RADIUS).fill(0),
}

const orbs = {
    x: Array(MAX_ORBS_NUM).fill(0),
    y: Array(MAX_ORBS_NUM).fill(0),
    charge: Array(MAX_ORBS_NUM).fill(0),
}

let unloadPhysics: () => void
let unloadRender: () => void

export const unloadWeapon = () => {
    unloadPhysics()
    unloadRender()
}

export const loadWeapon = () => {
    bullets.x = []
    bullets.y = []
    bullets.dirx = []
    bullets.diry = []
    bullets.age = []
    bullets.active = []
    bulletFreePool = []
    bulletFireRate.clear()

    auraDmgRate.clear()

    sabers.x = []
    sabers.y = []
    sabers.dirx = []
    sabers.diry = []
    sabers.age = []
    sabers.charge = []
    sabers.active = []
    saberFreePool = []
    saberFireRate.clear()

    unloadPhysics = addPhysicsComp((dt) => {
        // fire bullets
        if (bulletFireRate.tick(dt)) {
            const aimedMob = nearestMobPos()
            if (aimedMob) {
                // translate mob pos to hero pos
                const xpos = aimedMob.x - hero.x
                const ypos = aimedMob.y - hero.y
                const angle = Math.atan2(xpos, ypos)
                fireBullet(hero.x, hero.y, angle)
                playShoot()
            }
        }

        iterBullets((_x, _y, dirx, diry, id) => {
            // update existing bullets
            bullets.x[id] += dirx * BULLET_SPEED * dt
            bullets.y[id] += diry * BULLET_SPEED * dt
            bullets.age[id] += dt

            if (bullets.age[id] > BULLET_AGE) {
                removeBullet(id)
                return
            }

            // check for impact
            iterMobs((_mobx, _moby, mobid) => {
                if (
                    isHittingMob(
                        mobid,
                        bullets.x[id],
                        bullets.y[id],
                        SIZE,
                        SIZE,
                    )
                ) {
                    attackMob(mobid, stats.bulletDmg)
                    removeBullet(id)
                    return true
                }
            })
        })

        if (stats.auraRadius > 0) {
            // aura particles
            for (let i = 0; i < ~~(stats.auraRadius / 2); i++) {
                const age = (auraParticles.age[i] += dt)
                if (age >= AURA_PARTICLES_AGE) {
                    auraParticles.age[i] = randInt(0, AURA_PARTICLES_AGE / 2)
                    const angle = rand(0, 2 * Math.PI)
                    const dist = rand(0, stats.auraRadius)
                    auraParticles.x[i] = hero.x + Math.sin(angle) * dist
                    auraParticles.y[i] = hero.y + Math.cos(angle) * dist
                }
            }

            // aura damage
            if (auraDmgRate.tick(dt)) {
                iterMobs((mobx, moby, mobid) => {
                    if (
                        distance(
                            hero.x,
                            hero.y,
                            mobx + MOB_SIZE / 2,
                            moby + MOB_SIZE / 2,
                        ) < stats.auraRadius
                    ) {
                        attackMob(mobid, stats.auraDmg)
                    }
                })
            }
        }

        // spinny orbs
        if (stats.orbs > 0) {
            for (let i = 0; i < stats.orbs; i++) {
                const angle =
                    (i / stats.orbs) * 2 * Math.PI - stats.time * ORB_SPIN_SPEED
                orbs.x[i] = hero.x + 4 + Math.sin(angle) * stats.orbRadius
                orbs.y[i] = hero.y + 4 + Math.cos(angle) * stats.orbRadius
                orbs.charge[i] += dt
                if (orbs.charge[i] >= ORB_CHARGE_TIME) {
                    orbs.charge[i] = 0
                    iterMobs((_mobx, _moby, mobid) => {
                        if (
                            isHittingMob(
                                mobid,
                                orbs.x[i] - 4,
                                orbs.y[i] - 4,
                                SIZE,
                                SIZE,
                            )
                        ) {
                            attackMob(mobid, stats.orbsDmg)
                        }
                    })
                }
            }
        }

        // lightsabers
        if (stats.saber) {
            // fire saber
            if (saberFireRate.tick(dt)) {
                const aimedMob = nearestMobPos()
                if (aimedMob) {
                    // translate mob pos to hero pos
                    const xpos = aimedMob.x - hero.x
                    const ypos = aimedMob.y - hero.y
                    const dir = Math.atan2(xpos, ypos)
                    const angle = angleToVec(dir)
                    if (saberFreePool.length > 0) {
                        const i = saberFreePool.pop()!
                        sabers.x[i] = hero.x
                        sabers.y[i] = hero.y
                        sabers.dirx[i] = angle.x
                        sabers.diry[i] = angle.y
                        sabers.age[i] = 0
                        sabers.charge[i] = 0
                        sabers.active[i] = true
                    } else {
                        sabers.x.push(hero.x)
                        sabers.y.push(hero.y)
                        sabers.dirx.push(angle.x)
                        sabers.diry.push(angle.y)
                        sabers.age.push(0)
                        sabers.charge.push(0)
                        sabers.active.push(true)
                    }
                    playShoot()
                }
            }
            for (let i = 0; i < sabers.x.length; i++) {
                if (sabers.active[i]) {
                    sabers.x[i] += sabers.dirx[i] * SABER_SPEED * dt
                    sabers.y[i] += sabers.diry[i] * SABER_SPEED * dt
                    sabers.age[i] += dt
                    sabers.charge[i] += dt

                    if (sabers.age[i] > SABER_AGE) {
                        sabers.active[i] = false
                        saberFreePool.push(i)
                    } else if (sabers.charge[i] >= SABER_CHARGE_TIME) {
                        sabers.charge[i] = 0
                        iterMobs((_mobx, _moby, mobid) => {
                            if (
                                isHittingMob(
                                    mobid,
                                    sabers.x[i],
                                    sabers.y[i],
                                    16,
                                    16,
                                )
                            ) {
                                attackMob(mobid, stats.saberDmg)
                                return true
                            }
                        })
                    }
                }
            }
        }
    })

    unloadRender = addRenderComp((ctx, asset) => {
        // render bullets
        iterBullets((x, y, _dirx, _diry, _id) => {
            ctx.drawImage(
                asset.bullet,
                ~~(x - cam.x),
                ~~(y - cam.y),
                SIZE,
                SIZE,
            )
        })
        // render aura
        if (stats.auraRadius > 0) {
            ctx.fillStyle = LGREEN + "33"
            ctx.beginPath()
            ctx.arc(
                hero.x + 4 - cam.x,
                hero.y + 4 - cam.y,
                stats.auraRadius,
                0,
                Math.PI * 2,
            )
            ctx.fill()

            // particles
            ctx.fillStyle = LGREEN
            for (let i = 0; i < ~~(stats.auraRadius / 2); i++) {
                ctx.fillRect(
                    ~~(auraParticles.x[i] - cam.x),
                    ~~(auraParticles.y[i] - cam.y),
                    //- (auraParticles.age[i] * 0.002),
                    1,
                    1,
                )
            }
        }

        // render orbs
        if (stats.orbs > 0) {
            for (let i = 0; i < stats.orbs; i++) {
                ctx.drawImage(
                    asset.orb,
                    ~~(orbs.x[i] - 4 - cam.x),
                    ~~(orbs.y[i] - 4 - cam.y),
                )
            }
        }

        if (stats.saber) {
            // render sabers
            for (let i = 0; i < sabers.x.length; i++) {
                if (sabers.active[i]) {
                    const x = sabers.x[i] - cam.x
                    const y = sabers.y[i] - cam.y
                    // only render if in screen
                    if (aabb(x, y, 16, 16, 0, 0, WIDTH, HEIGHT)) {
                        ctx.save()
                        ctx.translate(x + 8, y + 8)
                        ctx.rotate(stats.time * 20)
                        ctx.translate(-(x + 8), -(y + 8))
                        ctx.drawImage(asset.saber, ~~x, ~~y)
                        ctx.restore()
                    }
                }
            }
        }
    })
}

export const fireBullet = (x: number, y: number, dir: number) => {
    const angle = angleToVec(dir)
    if (bulletFreePool.length > 0) {
        const i = bulletFreePool.pop()!
        bullets.x[i] = x
        bullets.y[i] = y
        bullets.dirx[i] = angle.x
        bullets.diry[i] = angle.y
        bullets.age[i] = 0
        bullets.active[i] = true
    } else {
        bullets.x.push(x)
        bullets.y.push(y)
        bullets.dirx.push(angle.x)
        bullets.diry.push(angle.y)
        bullets.age.push(0)
        bullets.active.push(true)
    }
}

const removeBullet = (i: number) => {
    bullets.active[i] = false
    bulletFreePool.push(i)
}

const iterBullets = (
    fn: (
        x: number,
        y: number,
        dirx: number,
        diry: number,
        id: number,
    ) => boolean | void,
) => {
    for (let i = 0; i < bullets.x.length; i++) {
        if (bullets.active[i]) {
            const end = fn(
                bullets.x[i],
                bullets.y[i],
                bullets.dirx[i],
                bullets.diry[i],
                i,
            )
            if (end) {
                break
            }
        }
    }
}

export const updateBulletFireRate = () => {
    bulletFireRate.interval(stats.bulletRate)
}

export const updateAuraDmgRate = () => {
    auraDmgRate.interval(stats.auraDmgRate)
}

export const updateSaberFireRate = () => {
    saberFireRate.interval(stats.saberRate)
}
