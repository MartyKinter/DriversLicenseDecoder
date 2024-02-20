/* eslint-disable react/prop-types */
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
                  videoConstraints={{
                    height: 150,
                    width: 750,
                  }}
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
