/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

export default function DecoderControls({
  isUsingWebcam,
  imageSrc,
  decodeBarcode,
  reset,
  webcamRef,
  fileRef,
  capture,
  switchSource,
  handleFileChange,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/iphone|ipad|ipod|android/.test(userAgent));
  }, []);

  const videoConstraints = isMobile
    ? {
        width: { min: 750 },
        height: { min: 150 },
        facingMode: "environment", // Use the back camera
      }
    : {
        width: 750,
        height: 150,
      };

  return (
    <>
      {imageSrc ? (
        <div className="decoder-controls">
          <div>
            <img className="decoder-image" src={imageSrc} alt="Image source" />
          </div>
          <div className="decoder-buttons">
            <button onClick={decodeBarcode}>Decode</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      ) : (
        <div className="decoder-controls">
          <div>
            {isUsingWebcam ? (
              <>
                <Webcam
                  className="decoder-webcam"
                  audio={false}
                  ref={webcamRef}
                  forceScreenshotSourceSize
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                <p>(Please place barcode as close to the camera as possible)</p>
              </>
            ) : (
              <input type="file" ref={fileRef} onChange={handleFileChange} />
            )}
          </div>
          <div className="decoder-buttons">
            {isUsingWebcam && <button onClick={capture}> Take Picture</button>}
            <button onClick={switchSource}>
              {isUsingWebcam ? "Switch to File Upload" : "Switch to Webcam"}
            </button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      )}
    </>
  );
}
