import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import { ReactComponent as IconClose } from "../../assets/svg/icon-close.svg";


export interface ModalProps {
    children?: ReactNode;
    label?: string;
    closeRequested?: () => void;
}

export function Modal(props: ModalProps) {
    const [elements, setElements] = useState<{
        portalRoot: HTMLElement;
        appRoot: HTMLElement;
        bodyRoot: HTMLElement;
    } | null>(null);

    useEffect(() => {
        const portalRoot = document.getElementById("modal-root");
        const appRoot = document.getElementById("root");
        const bodyRoot = document.getElementsByTagName("body")[0];

        if (portalRoot && appRoot) {
            setElements({ portalRoot, appRoot, bodyRoot });
        }
    }, []);

    useEffect(() => {
        elements && elements.appRoot.classList.add("modal-active");
        elements && elements.bodyRoot.classList.add("overflow-hidden");

        return () => {
            if (elements && elements.portalRoot.getElementsByClassName("modal-background")) {
                elements.appRoot.classList.remove("modal-active");
                elements.bodyRoot.classList.remove("overflow-hidden");
            }
        };
    }, [elements]);

    if (elements) {
        return ReactDOM.createPortal(
            <>
                <div
                    className="modal-background"
                    onClick={() => {
                        props.closeRequested && props.closeRequested();
                    }}
                />
                {props.children}
            </>,
            elements.portalRoot,
        );
    } else {
        return null;
    }
}

export const ModalWithBackground: React.FC<ModalProps> = props => {
    const onClick = () => {
        return props.closeRequested && props.closeRequested();
    };

    return (
        <Modal closeRequested={onClick}>
            <div className="modal__wrapper">
                <div className="modal__wrapper--container">
                    <div className="modal__card">
                        <div className="modal__close--wrap">
                            <IconClose className="modal__close-icon" onClick={onClick} />
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </Modal>
    );
};


