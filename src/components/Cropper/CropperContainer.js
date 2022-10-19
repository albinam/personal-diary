import React, {useRef, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./CropperContainer.scss";
import Loader from "../Loader/Loader";

function CropperContainer({src, getCroppedFile}) {
    const cropperRef = useRef(null);
    const [loading, setLoading] = useState(true);

    const handleClick = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const img = cropper.getCroppedCanvas().toDataURL();
        getCroppedFile(img);
    };
    const rotate = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.rotate(90);
    };

    return (
        <>
            {loading && (<Loader/>)}
            <div className="cropper">
                <button className="button-main cropper-button" onClick={rotate}>Повернуть</button>
                <Cropper
                    src={src}
                    style={{height: 400, width: "100%"}}
                    initialAspectRatio={16 / 9}
                    guides={false}
                    ready={() => {
                        setLoading(false);
                    }}
                    ref={cropperRef}
                />
                <button className="button-main cropper-button-crop" onClick={handleClick}>Обрезать</button>
            </div>
        </>
    );
}

export default CropperContainer;
