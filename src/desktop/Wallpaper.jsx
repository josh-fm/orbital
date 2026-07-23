import Nebula from "./effects/Nebula";
import Starfield from "./effects/Starfield";
import SpaceBackground from "./effects/SpaceBackground";

export default function Wallpaper() {

    return (

        <div className="wallpaper">
            <SpaceBackground />

            <Nebula />

            <Starfield />

            <div className="vignette"></div>

        </div>

    );

}