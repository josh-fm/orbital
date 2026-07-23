import { useState } from "react";

import Window from "../components/windows/Window";

import TerminalApp from "../apps/TerminalApp";
import GlobeApp from "../apps/GlobeApp";

import { useDesktop } from "../context/DesktopContext";



const APPS = {

    terminal: TerminalApp,

    globe: GlobeApp

};



const INITIAL_WINDOWS = [

    {

        id: "terminal",

        title: "Orbital Terminal",

        app: "terminal",

        bounds: {

            x: 120,
            y: 90,

            width: 900,
            height: 520

        },

        state: "normal",

        focused: true,

        visible: true,

        zIndex: 2

    },

    {

        id: "globe",

        title: "Orbital Globe",

        app: "globe",

        bounds: {

            x: 1050,
            y: 120,

            width: 500,
            height: 500

        },

        state: "normal",

        focused: false,

        visible: true,

        zIndex: 1

    }

];



export default function WindowManager() {

    const desktop  = useDesktop();
    console.log(desktop);

    const [windows, setWindows] = useState(INITIAL_WINDOWS);

    const [highestZ, setHighestZ] = useState(2);



    function updateWindow(id, updates) {

        setWindows(current =>

            current.map(window =>

                window.id === id

                    ? {

                        ...window,

                        ...updates

                    }

                    : window

            )

        );

    }



    function updateBounds(id, bounds) {

        setWindows(current =>

            current.map(window =>

                window.id === id

                    ? {

                        ...window,

                        bounds: {

                            ...window.bounds,

                            ...bounds

                        }

                    }

                    : window

            )

        );

    }



    function focusWindow(id) {

        const nextZ = highestZ + 1;

        setHighestZ(nextZ);

        setWindows(current =>

            current.map(window => {

                if (window.id === id) {

                    return {

                        ...window,

                        focused: true,

                        zIndex: nextZ

                    };

                }

                return {

                    ...window,

                    focused: false

                };

            })

        );

    }



    function dragWindow(event, id) {

        event.preventDefault();

        focusWindow(id);

        const window = windows.find(w => w.id === id);

        if (!window)
            return;

        const startMouseX = event.clientX;
        const startMouseY = event.clientY;

        const startX = window.bounds.x;
        const startY = window.bounds.y;



        function handleMouseMove(moveEvent) {

            const dx = moveEvent.clientX - startMouseX;
            const dy = moveEvent.clientY - startMouseY;

            updateBounds(id, {

                x: startX + dx,

                y: startY + dy

            });

        }



        function handleMouseUp() {

            document.removeEventListener(

                "mousemove",

                handleMouseMove

            );

            document.removeEventListener(

                "mouseup",

                handleMouseUp

            );

        }



        document.addEventListener(

            "mousemove",

            handleMouseMove

        );



        document.addEventListener(

            "mouseup",

            handleMouseUp

        );

    }



    function resizeWindow(event, id) {

        event.preventDefault();

        event.stopPropagation();

        const window = windows.find(w => w.id === id);

        if (!window)
            return;

        const startMouseX = event.clientX;
        const startMouseY = event.clientY;

        const startWidth = window.bounds.width;
        const startHeight = window.bounds.height;



        function handleMouseMove(moveEvent) {

            const dx = moveEvent.clientX - startMouseX;
            const dy = moveEvent.clientY - startMouseY;

            updateBounds(id, {

                width: Math.max(400, startWidth + dx),

                height: Math.max(300, startHeight + dy)

            });

        }



        function handleMouseUp() {

            document.removeEventListener(

                "mousemove",

                handleMouseMove

            );

            document.removeEventListener(

                "mouseup",

                handleMouseUp

            );

        }



        document.addEventListener(

            "mousemove",

            handleMouseMove

        );



        document.addEventListener(

            "mouseup",

            handleMouseUp

        );

    }



    function toggleMaximize(id) {

        setWindows(current =>

            current.map(window => {

                if (window.id !== id)
                    return window;

                if (window.state === "normal") {

                    return {

                        ...window,

                        previousBounds: {

                            ...window.bounds

                        },

                        bounds: {

                            x: desktop.x,

                            y: desktop.y,

                            width: desktop.width,

                            height: desktop.height

                        },

                        state: "maximized"

                    };

                }

                return {

                    ...window,

                    bounds: window.previousBounds,

                    previousBounds: null,

                    state: "normal"

                };

            })

        );

    }



    return (

        <>

            {

                windows

                    .filter(window => window.visible)

                    .sort((a, b) => a.zIndex - b.zIndex)

                    .map(window => {

                        const AppComponent = APPS[window.app];

                        return (

                            <Window

                                key={window.id}

                                id={window.id}

                                title={window.title}

                                bounds={window.bounds}

                                zIndex={window.zIndex}

                                focused={window.focused}

                                onFocus={focusWindow}

                                onDragStart={dragWindow}

                                onResizeStart={resizeWindow}

                                onToggleMaximize={toggleMaximize}

                            >

                                <AppComponent />

                            </Window>

                        );

                    })

            }

        </>

    );

}