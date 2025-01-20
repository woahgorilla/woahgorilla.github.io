export type Vec2 = { x: number; y: number }

/** Try to use this operator directly */
export const floor = (x: number) => ~~x

export const rad = (a: number) => (a * Math.PI) / 180

export const rand = (a = 0, b = 1) => b + (a - b) * Math.random()

export const randInt = (a: number, b: number) => Math.round(rand(a, b))

export const clamp = (value: number, min: number, max: number) =>
    value < min ? min : value > max ? max : value

/**
 * Distance b/w 2 vectors
 */
export const distance = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
}

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
export const aabb = (
    x1: number,
    y1: number,
    w1: number,
    h1: number,
    x2: number,
    y2: number,
    w2: number,
    h2: number,
) => x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2

export const pointInRect = (
    px: number,
    py: number,
    x: number,
    y: number,
    w: number,
    h: number,
) => px > x && py > y && px < x + w && py < y + h

export const ccCollision = (
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number,
) => distance(x1, y1, x2, y2) < r1 + r2

export const cpCollision = (
    cx: number,
    cy: number,
    r: number,
    px: number,
    py: number,
) => distance(cx, cy, px, py) < r

/**
 * Linearly interpolate between two values.
 * `weight` should be between 0 & 1, but may be larger for extrapolation
 */
export const lerp = (from: number, to: number, weight: number) =>
    from + (to - from) * weight

/**
 * Normalize a vec2 inplace
 * taken from gl-matrix
 */
export const normalize = (v: Vec2) => {
    var len = v.x * v.x + v.y * v.y
    if (len > 0) {
        len = 1 / Math.sqrt(len)
    }
    v.x = v.x * len
    v.y = v.y * len
}

/**
 * Limit vec2 magnitude to not exceed 1, inplace
 */
export const limitMagnitude = (v: Vec2) => {
    const len = distance(0, 0, v.x, v.y)
    if (len > 1) {
        const mag = 1 / len
        v.x *= mag
        v.y *= mag
    }
}

export const angleToVec = (a: number): Vec2 => ({
    x: Math.sin(a),
    y: Math.cos(a),
})

/** Pick a random element from given array and return it */
export const pickRandom = <T extends unknown>(arr: T[]) => {
    const i = randInt(0, arr.length - 1)
    return arr[i]
}

/** Remove a random element from given array and return it */
export const extractRandom = <T extends unknown>(arr: T[]) => {
    const i = randInt(0, arr.length - 1)
    const [ele] = arr.splice(i, 1)
    return ele
}
