import React from "react";
import EnsureLines from "../EnsureLines";
import {ImGurImageTypePros} from "../../store/use-app-io";

interface ImgurImageProps {
    id: string,
    alt: string,
    description: string
}

const ImgurImageThumbl: React.FC<ImgurImageProps> = ({id, alt, description}) => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <div className="imgur__image--wrap">
            <img
                className="image thumb"
                alt={alt}
                src={`https://i.imgur.com/${id}_d.jpg?maxwidth=200&shape=thumb`}
                style={{visibility: isLoaded ? "hidden" : "visible"}}
            />
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className="image full"
                style={{opacity: isLoaded ? 1 : 0}}
                alt={alt}
                src={`https://i.imgur.com/${id}_d.jpg?maxwidth=520&shape=thumb`}
            />
            {description && isLoaded && <div className='imgur__image--wrap__overlay'>
                <EnsureLines
                    title={description}
                    ensuredLinesCount={2}
                />
            </div>}
        </div>
    )
}

export default ImgurImageThumbl;

interface ImgurBigImage {
    type: ImGurImageTypePros;
    image: string
}

export const ImgurBigImage: React.FC<ImgurBigImage> = ({type, image}) => {
    return (
        <>
            {type === "video/mp4" ?
                (
                    <video controls>
                        <source src={image} type="video/mp4"/>
                    </video>
                ) :
                (
                    <img
                        className="imgur__bigImage"
                        src={image}
                    />
                )
            }
        </>
    )
}