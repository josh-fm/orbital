import "./Window.css";
import TitleBar from "./TitleBar";

export default function Window({

    id,

    title,

    bounds,

    zIndex,

    focused,

    onFocus,

    onDragStart,

    onResizeStart,

    onToggleMaximize,

    children

}) {

    return (

        <div

            className={`window ${focused ? "active" : ""}`}

            style={{

                left: bounds.x,

                top: bounds.y,

                width: bounds.width,

                height: bounds.height,

                zIndex

            }}

        >

            <TitleBar

                id={id}

                title={title}

                onFocus={onFocus}

                onDragStart={onDragStart}

                onToggleMaximize={onToggleMaximize}

            />

            <div className="windowContent">

                {children}

            </div>

            <div

                className="resizeHandle"

                onMouseDown={(event) =>

                    onResizeStart(event, id)

                }

            />

        </div>

    );

}