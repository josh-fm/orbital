import { useEffect, useRef } from "react";

export default function Nebula() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let dpr = window.devicePixelRatio || 1;

        let animation;

        let clouds = [];

        function generateClouds() {
            clouds = [];

            const colours = [
                "70,120,255",
                "0,170,255",
                "90,80,255",
                "120,70,255",
                "30,140,255",
                "150,90,255"
            ];

            for (let i = 0; i < 30; i++) {
                clouds.push({
                    x: Math.random() * width,
                    y: Math.random() * height,

                    radius:
                        220 +
                        Math.random() * 450,

                    alpha:
                        0.015 +
                        Math.random() * 0.045,

                    colour:
                        colours[
                            Math.floor(
                                Math.random() *
                                colours.length
                            )
                        ],

                    speedX:
                        (Math.random() - 0.5) *
                        0.03,

                    speedY:
                        (Math.random() - 0.5) *
                        0.02,

                    phase:
                        Math.random() *
                        Math.PI *
                        2
                });
            }
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;

            dpr = window.devicePixelRatio || 1;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

            generateClouds();
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

            ctx.filter = "blur(45px)";

            for (const cloud of clouds) {
                cloud.x += cloud.speedX;
                cloud.y += cloud.speedY;

                if (cloud.x < -cloud.radius)
                    cloud.x = width + cloud.radius;

                if (cloud.x > width + cloud.radius)
                    cloud.x = -cloud.radius;

                if (cloud.y < -cloud.radius)
                    cloud.y = height + cloud.radius;

                if (cloud.y > height + cloud.radius)
                    cloud.y = -cloud.radius;

                const alpha =
                    cloud.alpha *
                    (
                        0.8 +
                        Math.sin(
                            time * 0.00025 +
                            cloud.phase
                        ) *
                        0.2
                    );

                const gradient =
                    ctx.createRadialGradient(
                        cloud.x,
                        cloud.y,
                        0,
                        cloud.x,
                        cloud.y,
                        cloud.radius
                    );

                gradient.addColorStop(
                    0,
                    `rgba(${cloud.colour}, ${alpha})`
                );

                gradient.addColorStop(
                    0.45,
                    `rgba(${cloud.colour}, ${alpha * 0.45})`
                );

                gradient.addColorStop(
                    1,
                    "transparent"
                );

                ctx.fillStyle = gradient;

                ctx.beginPath();

                ctx.arc(
                    cloud.x,
                    cloud.y,
                    cloud.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

            ctx.filter = "none";

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
            className="nebulaCanvas"
        />
    );
}