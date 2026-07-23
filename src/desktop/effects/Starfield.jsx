import { useEffect, useRef } from "react";

export default function Starfield() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        let animation;
        let stars = [];

        let cameraX = 0;
        let cameraY = 0;

        function createLayer(
            count,
            minRadius,
            maxRadius,
            drift,
            alphaMin,
            alphaMax
        ) {
            for (let i = 0; i < count; i++) {
                const radius =
                    minRadius +
                    Math.random() *
                        (maxRadius - minRadius);

                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,

                    radius,

                    alpha:
                        alphaMin +
                        Math.random() *
                            (alphaMax - alphaMin),

                    twinkle:
                        Math.random() *
                        Math.PI *
                        2,

                    speed:
                        0.0007 +
                        Math.random() *
                        0.005,

                    layer: drift * 100,

                    rotation:
                        Math.random() *
                        Math.PI,

                    stretch:
                        0.6 +
                        Math.random() *
                        0.4,

                    flareSize:
                        4 +
                        Math.random() *
                        7,

                    type:
                        Math.random() > 0.987
                            ? "flare"
                            : Math.random() > 0.93
                            ? "glow"
                            : "point",

                    color:
                        Math.random() > 0.97
                            ? "#ffe9ba"
                            : Math.random() > 0.94
                            ? "#bfd9ff"
                            : "#ffffff",
                });
            }
        }

        function generateStars() {
            stars = [];

            // Deep background
            createLayer(
                2200,
                0.25,
                0.75,
                0.003,
                0.10,
                0.35
            );

            // Mid stars
            createLayer(
                700,
                0.7,
                1.6,
                0.012,
                0.25,
                0.70
            );

            // Bright foreground
            createLayer(
                180,
                1.4,
                3.0,
                0.025,
                0.5,
                1
            );
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;

            dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            generateStars();
        }

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        function render(time) {
            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            cameraX += 0.012;
            cameraY += 0.003;

            for (const star of stars) {
                const brightness =
                    0.65 +
                    Math.sin(
                        time *
                            star.speed +
                            star.twinkle
                    ) *
                        0.35;

                let drawX =
                    star.x -
                    cameraX *
                        star.layer;

                let drawY =
                    star.y -
                    cameraY *
                        star.layer;

                if (drawX < -20)
                    drawX += width + 40;
                if (drawX > width + 20)
                    drawX -= width + 40;

                if (drawY < -20)
                    drawY += height + 40;
                if (drawY > height + 20)
                    drawY -= height + 40;

                ctx.globalAlpha =
                    star.alpha *
                    brightness;

                if (star.type === "flare") {
                    const size =
                        star.flareSize *
                        brightness;

                    ctx.strokeStyle =
                        star.color;

                    ctx.lineWidth = 1;

                    ctx.beginPath();

                    ctx.moveTo(
                        drawX,
                        drawY - size
                    );

                    ctx.lineTo(
                        drawX,
                        drawY + size
                    );

                    ctx.moveTo(
                        drawX - size,
                        drawY
                    );

                    ctx.lineTo(
                        drawX + size,
                        drawY
                    );

                    ctx.stroke();

                    ctx.fillStyle =
                        star.color;

                    ctx.beginPath();

                    ctx.arc(
                        drawX,
                        drawY,
                        star.radius *
                            1.5,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();
                } else if (
                    star.type === "glow"
                ) {
                    const gradient =
                        ctx.createRadialGradient(
                            drawX,
                            drawY,
                            0,
                            drawX,
                            drawY,
                            star.radius * 6
                        );

                    gradient.addColorStop(
                        0,
                        star.color
                    );

                    gradient.addColorStop(
                        1,
                        "transparent"
                    );

                    ctx.fillStyle =
                        gradient;

                    ctx.beginPath();

                    ctx.arc(
                        drawX,
                        drawY,
                        star.radius * 6,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();
                } else {
                    ctx.fillStyle =
                        star.color;

                    ctx.beginPath();

                    ctx.ellipse(
                        drawX,
                        drawY,
                        star.radius,
                        star.radius *
                            star.stretch,
                        star.rotation,
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();
                }
            }

            ctx.globalAlpha = 1;

            animation =
                requestAnimationFrame(
                    render
                );
        }

        animation =
            requestAnimationFrame(
                render
            );

        return () => {
            cancelAnimationFrame(
                animation
            );

            window.removeEventListener(
                "resize",
                resize
            );
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="starfield"
        />
    );
}