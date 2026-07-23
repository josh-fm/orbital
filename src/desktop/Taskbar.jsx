import { useEffect, useState } from "react";

export default function Taskbar() {

    const [time, setTime] = useState("");

    useEffect(() => {

        function updateClock() {

            setTime(

                new Date().toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                )

            );

        }

        updateClock();

        const timer =
            setInterval(
                updateClock,
                1000
            );

        return () =>
            clearInterval(timer);

    }, []);

    return (

        <header className="taskbar">

            <div className="taskbarLeft">

                <div className="orbitalLogo" />

                <span className="taskbarTitle">

                    ORBITAL

                </span>

            </div>

            <div className="taskbarCenter">

            </div>

            <div className="taskbarRight">

                <span className="clock">

                    {time}

                </span>

            </div>

        </header>

    );

}