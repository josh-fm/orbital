import {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

const DesktopContext = createContext();

export function DesktopProvider({

    children

}) {

    const [desktopBounds, setDesktopBounds] = useState({

        x: 0,

        y: 0,

        width: window.innerWidth,

        height: window.innerHeight - 80

    });

    useEffect(() => {

        function handleResize() {

            setDesktopBounds({

                x: 0,

                y: 0,

                width: window.innerWidth,

                height: window.innerHeight - 80

            });

        }

        window.addEventListener(

            "resize",

            handleResize

        );

        return () =>

            window.removeEventListener(

                "resize",

                handleResize

            );

    }, []);

    return (

        <DesktopContext.Provider

            value={desktopBounds}

        >

            {children}

        </DesktopContext.Provider>

    );

}

export function useDesktop() {

    return useContext(

        DesktopContext

    );

}