import React from "react";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import ImgurImageThumbl, {ImgurBigImage} from "./ImgurImage";
import {ImGurArrayProps} from "../../store/use-app-io";
import './styles.scss'
import {ModalWithBackground} from "../Modal";
import { ReactComponent as IconArrowUp } from "../../assets/svg/icon-arrow-up.svg";
import { ReactComponent as IconArrowDown } from "../../assets/svg/icon-arrow-down.svg";
import { ReactComponent as IconCircle } from "../../assets/svg/icon-circle.svg";


interface ImgurProps {
    thumb: ImGurArrayProps
}


const ImgurBox: React.FC<ImgurProps> = ({thumb}) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false)

    useIntersectionObserver({
        target: ref,

        onIntersect: ([{isIntersecting}]: any, observerElement: { unobserve: (arg0: HTMLDivElement | null) => void; }) => {
            if (isIntersecting) {
                if (!isVisible) {
                    setIsVisible(true);
                }
                observerElement.unobserve(ref.current);
            }
        }
    });

    return (
        <>
            <div className='imgur'>
                <div className="imgur__wrap">
                    <div
                        ref={ref}
                        onClick={()=>setShowModal(true)}
                        className="imgur__image"
                    >
                        {isVisible && thumb.images ?
                            <ImgurImageThumbl alt={thumb.images[0].title} id={thumb.images[0].id}
                                        description={thumb.images[0].description}/> :
                            <ImgurImageThumbl id={thumb.id} alt={thumb.title} description={thumb.description}/>
                        }
                    </div>

                </div>
            </div>
            {showModal && <ModalWithBackground closeRequested={()=>setShowModal(false)}>
                <div className="modal__content">
                    <div className="modal__content--wrap">
                        <div className="modal-image">
                            <ImgurBigImage
                                type={thumb.images ? thumb.images[0].type : thumb.type}
                                image={thumb.images ? thumb.images[0].link : thumb.link}
                            />
                        </div>
                        <div className="modal-overview">
                            <h3>{thumb.images ? thumb.images[0].title : thumb.title}</h3>
                            <p>{thumb.images ? thumb.images[0].description : thumb.description}</p>
                            <div className="modal-overview__info">
                                <span><IconArrowUp/> {thumb.ups}</span>
                                <span><IconArrowDown /> {thumb.downs}</span>
                                <span><IconCircle /> {thumb.score}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWithBackground>}
        </>
    )
}

export default ImgurBox;