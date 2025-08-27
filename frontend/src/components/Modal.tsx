import { PropsWithChildren, useState } from "react";

function createModal({ children }: PropsWithChildren<{}>) {
    const [shown, setShown] = useState(false);

    const toggle = () => setShown(!shown);

    const handleKeyDown = (ev: any) => {
        if(ev.key == "Escape" && shown) {
            setShown(false);
        }
    }
    window.addEventListener("keydown", handleKeyDown);

    const element = shown
        ? <div className="modal-root">
            <p className="modal-esc-helper">Naciśnij <kbd>ESC</kbd> aby wyjść</p>
            <div className="modal">{children}</div>
        </div>
        : null;

    return { element, toggle };
}

export default createModal;