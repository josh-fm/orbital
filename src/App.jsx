import Desktop from "./desktop/Desktop";
import {

    DesktopProvider

} from "./context/DesktopContext";

export default function App() {

    return (

        <DesktopProvider>

            <Desktop />

        </DesktopProvider>

    );

}