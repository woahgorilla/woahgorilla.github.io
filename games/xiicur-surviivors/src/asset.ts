import { CTX, texture } from "./core/canvas"

const img = async (data: string) => {
    const obj = new Image()
    obj.src = data
    await new Promise((resolve) => {
        obj.onload = resolve
    })
    return obj
}

export type Assets = Awaited<ReturnType<typeof loadAssets>>

export const loadAssets = async () => {
    const hero = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAQCAYAAACBSfjBAAAB80lEQVRYR2NkGAUUhQAjRbqxaDbVdvqPz8zTV/fhtXOo6cfwDCUeAOk1nj4RZ/hZSX1hmOxfzYArEAezfpDbjz3jYTibmY/ifpQApMQDIL1ioR0Msk6ceBM1rkAcCvqxBSI8AIeCB0AxM5ARQPMADG2VA6e+e0LFJGdjUAQOdv0EA5BaHjh4IQtvVkYvR0ChjRyAA60fXwIAuRXZ/ShZGBaA1PAAyCJc5SExATjQ+vGV5UQFICUewFeLWChzMBRH3MKoiZFT4GDVD3L7ibs/GFZXP4K7H2sKJMcDsGzIyisG1h5QwYHVGGTL0RWAAnEw68cW+RjNGEo8gB6I3DzfUcLow/PPONuAMIXIgTgU9GNtSMMCkVwPzCtVY5ByNAOHydzzhxiSDe3AbA+vJTgDsGtDArgHA0qh+PTDyumygAVwt8P0gsRAEUDIfmT1yDEME/f8wAF3f+as2wzT01Th7pfU5WDYtGIb3G4MR5DjAZDpyAEAssQmApKVkQHIbGwBQKl+9ADEZz+oF0QoAI+seIXT/UQFIL0DADmQQSmIUADgK6PprR9rFvaW+8HAla4Gzk4ggMwnZjBgOOkH+RcUKbjCAGcAqhspMkS2LgXLN3ha/Qfx+zY8J6oSAFk2UPphFRnMDTfP3Qe7hVS3o6uHBSK6WQByWKEvYrCHVwAAAABJRU5ErkJggg==",
    )
    const mob0 = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAAA8UlEQVRIS9WWvRHCMAyFnZIhmCAlxwLZhiqzUGWbLMBRZgKGoIRT7pQzsqyfmBji2u9Z37OtUxN2vpqd1x9YgHPbvTiw2zT+HXBSEBR/Gq7sxdwvfbBA1AzgA0AqHok0iNoBqABQcHwjEsAvAhABoFhcCOEF2DoA8Q9QAO/zqRGACgDJY4prAEr18Qvgzjd3IW/xXBvzesTBYRC0C6qf+Bvdx+JhaQDgQ0NYADQDb3reG9DOz4WQADzGZ3L2sTsk5HQTFsDpYa/moelzHjPAWjFCWPQShFXPeSwAnqGOfqTc6JDzLNWDL3psMsyVzkIe/RvbKi8gvX+8OQAAAABJRU5ErkJggg==",
    )
    const mob1 = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAABdElEQVRIS9VWO27CQBC1cwAKCitHQKLmAhQoQkqRBm4CVapUcA6apElBR8EFUkfKEZALChACKQXRLBrreTxjdr0iEtvw8by3780P0uTOT4r6e93+mT5/fa9L34fG/GdOCqEk/m0+dXe/TmaqCYp5GQ1czOfHqohh49fM0/OQWJ9EOAMonkHSBIpHAxJLOD5YSRbOCZAcUqzsAjSO/GoFpAlLvGX+Gr4uAYi1KoBdUJkBbCOLoC47PnjZalYHtB47hYTjYeve/+7zhAxQC9OpDCuXKsuy5PTQVgl8hjwUL1sE8Sx++T5InscrZ4KTUKkAAfmwAY1AM0EimuIlljTg/SyeXp+Gi2KBlGYAL/clYLNNBWj4PL9kWKsCtxEnUDUQQhArAPHU87vNj7qecR6x+iUDTQhiBaAwqqKmgQXTc9m6lRkIJYgVIDed9kOHwqUJcwvhqqsjiBVgrWqZGKsK5n8eX4JYAT74uhgvA7GX3BJ/9wb+AKXXn2JBm/VRAAAAAElFTkSuQmCC",
    )
    const mob2 = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAABT0lEQVRIS9WWMQrCQBBFN51VSksbwcZasPYOgvewtJAUlp7CRvAOXiCtglqJpZV4AWUCH8ZkZ2Y3MYKpwuruvD/zZzaJ+/Mn8fGPhpOXbz0/7r3//3YOYuJ/AGHjejvwMs1nl2LdEhIDwAPViV8RwOGfy3txfpp1Hd6z80MUUAegLCA2fkXAdNVz435HdAVVQaoACYgFKAuIjV/xNEFIh2jwBKLtBWiTM3x7xSYui7ACA7BJArQzpPjiVCk3otW4lhVCE8BFSD7mLOYYhacxgUKmEOwUAiCNcXLAdZO6/HRwxEDx+RpEqBYKOaApgHUPWQlspQLcfhaAlgA+DaN6wNeIMR7+5X6xAjxzmEihIr4pAN7fLW7e+0e8B6i02AQgvqZ9/3ABBIAmrDPJiEEbHGoP8IDwdSgERBAAVVDKoJQI3kdazFa/LkMhtGpav70BoUZSIApIX7UAAAAASUVORK5CYII=",
    )
    const mob3 = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAQCAYAAABQrvyxAAABJklEQVRIS72VLQ7CQBCFtwKJxXABEhCYGurgHJyDA+C4BucAh6pBQMIFMLVIBGRoJpndbDs/y3ZN06Zv533bmdfCZVrlfP2JbV3fz8U/S3ZulmIAtPvDzq2qhed1U22dFEBaPwqQaoDqwfTpcnRwhSUB0NRnAVIN5NZnB6A9JG0hzRdkAawGUAftA2vwFkoxQKFxGCW9jzo6wNwBsJFmMQBGYimigQhhurSqGJUaAPOj8cSL0PerESVQ7Cvgs1j9zhlIMYAAy2kLcX02TgOgOYBegFQDQ+izAOAMlLP2T1w/bur2gQ6QHEDvDFgNUABt+9AZkNRnASwGoIehuEUbAnB7eABQGCbdYoBqafxIkgu1WvPw/g+AbhDmN2cgLO5lp/LG8u/4AmmZYSCJrToFAAAAAElFTkSuQmCC",
    )
    const coin = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAVklEQVQYV2NkQAKm2k7/QdzTV/cxwoThDJBkc1c5g5W1DoOzdSxcEVgBTBLEBikAAZgiKioIDHMDG21kYgima8s6we5AcSRIEUgBTBKkEK4A5lh0bwIASnsyCb4xmwAAAAAASUVORK5CYII=",
    )
    const bullet = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAQ0lEQVQYV2NkIAAYYfKm2k7/kdWevroPLAcmQJI7tsWgmOXhtYQBpAhFASu/O1jR7487GchTgGwHigkwd+B0JD6fAgA0lyoJwxgCagAAAABJRU5ErkJggg==",
    )
    const elements = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAICAYAAABatbkrAAAB6UlEQVRIS6VVMSxEQRDdKyQKCa1SFAoSjYtwUSBBNGhUVCgUokOIXC5C0CpRUWnQCBIUcoccxQWF4kgUrqW7REHeJrOZP3b+/3Lb3O3uzO7bN+/NT5gYI9nc80Nh+efLhJZCcTJmLbPu8nnuYnohcJaWjxyOAXMNB+L4ng972HvkPRagBMbn+H96MubeNTC47wWHuJXNedOZajG9qXEXo5FDBxJJyJ85XjW5jxrzMD0buAN7DcPtpi1ZMvf5epv6dnTnYiQpvAiEa3luIxAPrHyNchA/Mtpnp4cH5yaBhXRTnV3IvHzaXzkHQVW1/eb768z4COLk0EVEUqUEETnlYsFUN7YGxAuSMEDs1tDSn8JRoSUZPtIkQa/vRVO4LQYJktYhwsIU5COHk0TV0GzJFYSHYMhqQz1ygLDSY9mS4lMQKRLEoeB4C1mPRCHX6I6AgrDIVURBWrLP+9K3dAZiJyemvP2HYnZ2t53NOTD+GE6QZjNfAQhXFEFkq6vrG9Pd1WGPcgri0uLWimrGYfsc7H8I8vUgshjOlDaL04fitBCfyv8QRErCbxQ5sJzWrGUlKyWIcEmbSXJkH+K2C3MI9i6yewHYueyTs7r6ydZ6BgGOqyDEaySRvbiKtQJFfeYlIRKflq+1B8L0C2GZriA+26fSAAAAAElFTkSuQmCC",
    )
    const rocks = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAWklEQVQoU2NkoBAwIutv8LT6D+I3bD9GlDhILVyhqbbTf2+5H3DzYIbADIVJoBsONgCkGZtPTl/dx4huALoLUZyKzRB8hqN4AV9YIhsCchWyWoIuIBRJFBsAAMlEIQkNy0rpAAAAAElFTkSuQmCC",
    )
    const crate = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+0lEQVQ4T2NkoBAwUqifAWyAqbbTf3IMOn11HyMjSHNgmBuDkYkhSWacO3OeYf2qXQxgA5q7ysGaQYLI4MT1Q2CuhaYdijjMstqyToQBIM3Irrj0ezmKJj3WSDgfphbFAGzuhxmCrBlZHdwA5DBAdwmyBmQ5lDAAGQAC+w8fZyguzMIIC5ghIC/29k9jcLS1BAvBAxHZAJAETAG6t0AWIMvDDRCQ5AVrQlcAC1RY7CDLg9gfnn+GxIK+hTLDw4evMMJRXl4MLIZL7uKJuwgDlOSUMVyAzwv3Ht1lgBsAUojsCpjN6AbAXAKSB2kGAcrzAswWUjMUKCOB9AIA8X2M/BEdxqQAAAAASUVORK5CYII=",
    )
    const saber = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArUlEQVQ4T2NkIAOYajv9h2ljJFU/SHPuxlawtsn+1QwkGYCs+dgzHoazmfnEG4BN8+mr+xiJcgEuzSBvEDQAn2aCBoA0N3eVM7xS52OA+RnkbOSAx+kCkGYBSV6G4sIshnNnzjOsX7WLAV0zThfAbO7tnwa27MPzz1g1YzUA5mexm5/w2ow1IREKMGyJDh4G5GiGe4FczWADKNGMYgCueCaU2cAugCnCFs+EDAAA6iGC9K9ePj0AAAAASUVORK5CYII=",
    )
    const orb = await img(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAXklEQVQYV2NkgAJTbaf/MDaIPn11HyOIBhMgSePpExmspL6A1Rx7xsNwNjMfrIgRJtmlJ8Sw4c0jsIIAETmGskvvwIrACnI3tsIlQAyYwsn+1UQqANmP0wqCjiTkTQAGCUCN2E8zpwAAAABJRU5ErkJggg==",
    )

    // included normal and flipped versions for asymmetric sprites
    // note: make sure spritesheet frames are always in 1 row
    return {
        coin,
        hero: [
            // normal
            texture((ctx) => frame(ctx, hero, 0, 0, 16, 0), 16, 16),
            texture((ctx) => frame(ctx, hero, 0, 0, 16, 1), 16, 16),
            texture((ctx) => frame(ctx, hero, 0, 0, 16, 2), 16, 16),
            texture((ctx) => frame(ctx, hero, 0, 0, 16, 3), 16, 16),
            texture((ctx) => frame(ctx, hero, 0, 0, 16, 4), 16, 16),
            // flipped
            texture((ctx) => flipFrame(ctx, hero, 0, 0, 16, 0), 16, 16),
            texture((ctx) => flipFrame(ctx, hero, 0, 0, 16, 1), 16, 16),
            texture((ctx) => flipFrame(ctx, hero, 0, 0, 16, 2), 16, 16),
            texture((ctx) => flipFrame(ctx, hero, 0, 0, 16, 3), 16, 16),
            texture((ctx) => flipFrame(ctx, hero, 0, 0, 16, 4), 16, 16),
        ],
        mob0: [
            // normal
            texture((ctx) => frame(ctx, mob0, 0, 0, 16, 0), 16, 16),
            texture((ctx) => frame(ctx, mob0, 0, 0, 16, 1), 16, 16),
            texture((ctx) => frame(ctx, mob0, 0, 0, 16, 2), 16, 16),
            //flipped
            texture((ctx) => flipFrame(ctx, mob0, 0, 0, 16, 0), 16, 16),
            texture((ctx) => flipFrame(ctx, mob0, 0, 0, 16, 1), 16, 16),
            texture((ctx) => flipFrame(ctx, mob0, 0, 0, 16, 2), 16, 16),
        ],
        mob1: [
            // normal
            texture((ctx) => frame(ctx, mob1, 0, 0, 16, 0), 16, 16),
            texture((ctx) => frame(ctx, mob1, 0, 0, 16, 1), 16, 16),
            texture((ctx) => frame(ctx, mob1, 0, 0, 16, 2), 16, 16),
            //flipped
            texture((ctx) => flipFrame(ctx, mob1, 0, 0, 16, 0), 16, 16),
            texture((ctx) => flipFrame(ctx, mob1, 0, 0, 16, 1), 16, 16),
            texture((ctx) => flipFrame(ctx, mob1, 0, 0, 16, 2), 16, 16),
        ],
        mob2: [
            // normal
            texture((ctx) => frame(ctx, mob2, 0, 0, 16, 0), 16, 16),
            texture((ctx) => frame(ctx, mob2, 0, 0, 16, 1), 16, 16),
            texture((ctx) => frame(ctx, mob2, 0, 0, 16, 2), 16, 16),
            //flipped
            texture((ctx) => flipFrame(ctx, mob2, 0, 0, 16, 0), 16, 16),
            texture((ctx) => flipFrame(ctx, mob2, 0, 0, 16, 1), 16, 16),
            texture((ctx) => flipFrame(ctx, mob2, 0, 0, 16, 2), 16, 16),
        ],
        mob3: [
            // normal
            texture((ctx) => frame(ctx, mob3, 0, 0, 16, 0), 16, 16),
            texture((ctx) => frame(ctx, mob3, 0, 0, 16, 1), 16, 16),
            texture((ctx) => frame(ctx, mob3, 0, 0, 16, 2), 16, 16),
            //flipped
            texture((ctx) => flipFrame(ctx, mob3, 0, 0, 16, 0), 16, 16),
            texture((ctx) => flipFrame(ctx, mob3, 0, 0, 16, 1), 16, 16),
            texture((ctx) => flipFrame(ctx, mob3, 0, 0, 16, 2), 16, 16),
        ],
        bullet,
        crate,
        saber,
        orb,
        eHeart: texture((ctx) => frame(ctx, elements, 0, 0, 8, 0), 8, 8),
        eBullet: texture((ctx) => frame(ctx, elements, 0, 0, 8, 1), 8, 8),
        eArrow: texture((ctx) => frame(ctx, elements, 0, 0, 8, 2), 8, 8),
        eBg: texture((ctx) => frame(ctx, elements, 0, 0, 8, 3), 8, 8),
        eSaber: texture((ctx) => frame(ctx, elements, 0, 0, 8, 4), 8, 8),
        ePlasma: texture((ctx) => frame(ctx, elements, 0, 0, 8, 5), 8, 8),
        eOrbs: texture((ctx) => frame(ctx, elements, 0, 0, 8, 6), 8, 8),
        eMagnet: texture((ctx) => frame(ctx, elements, 0, 0, 8, 7), 8, 8),
        eShoes: texture((ctx) => frame(ctx, elements, 0, 0, 8, 8), 8, 8),
        eXp: coin,
        rocks: [
            texture((ctx) => frame(ctx, rocks, 0, 0, 8, 0), 8, 8),
            texture((ctx) => frame(ctx, rocks, 0, 0, 8, 1), 8, 8),
        ],
    }
}

const frame = (
    ctx: CTX,
    img: CanvasImageSource,
    x: number,
    y: number,
    size: number,
    idx: number,
) => {
    ctx.drawImage(img, size * idx, 0, size, size, ~~x, ~~y, size, size)
}

const flipFrame = (
    ctx: CTX,
    img: CanvasImageSource,
    x: number,
    y: number,
    size: number,
    idx: number,
) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(-1, 1)
    frame(ctx, img, -size, 0, size, idx)
    ctx.restore()
}
