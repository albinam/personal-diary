import React from "react";
import CropperContainer from "../CropperContainer";
import "./Popup.scss"

export default function Popup({image, handleClose, getCroppedFile }) {
    return (
        <div className="popup-container">
            <div className="popup-body">
                <CropperContainer
                    src={image}
                    getCroppedFile={getCroppedFile}
                />
                <button className="button-clear button-popup" onClick={handleClose}>Закрыть</button>
            </div>
        </div>
    );
}
