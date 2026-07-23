import Wallpaper from "./Wallpaper";
import WindowManager from "./WindowManager";
import Dock from "./Dock";
import Taskbar from "./Taskbar";

export default function Desktop() {
    return (
        <main className="desktop">
            <Wallpaper />
            <WindowManager />
            <Dock />
            <Taskbar />
        </main>
    );
}