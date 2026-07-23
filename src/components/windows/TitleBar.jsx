export default function TitleBar({

    id,

    title,

    onFocus,

    onDragStart,

    onToggleMaximize

}) {

    return (

        <div

            className="windowTitlebar"

            onMouseDown={(event) => {

                onFocus(id);

                onDragStart(event, id);

            }}

            onDoubleClick={() =>

                onToggleMaximize(id)

            }

        >

            <div className="windowControls">

                <button
                    className="windowButton close"
                    type="button"
                />

                <button
                    className="windowButton minimize"
                    type="button"
                />

                <button
                    className="windowButton maximize"
                    type="button"
                />

            </div>

            <div className="windowTitle">

                {title}

            </div>

        </div>

    );

}