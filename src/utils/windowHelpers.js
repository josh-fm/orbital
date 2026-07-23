export function clamp(value, min, max) {

    return Math.min(

        Math.max(value, min),

        max

    );

}

export function copyBounds(bounds) {

    return {

        x: bounds.x,

        y: bounds.y,

        width: bounds.width,

        height: bounds.height

    };

}