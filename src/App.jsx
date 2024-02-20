import { useRef, useState } from "react";
import { BrowserPDF417Reader } from "@zxing/browser";
import { decodeLicenseData } from "./utils/LicenseDecoder";
import Results from "./components/Results";
import DecoderControls from "./components/DecoderControls";

const BarcodeScanner = () => {
  const webcamRef = useRef(null);
  const fileRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isUsingWebcam, setIsUsingWebcam] = useState(true); // Default to webcam

  const handleFileChange = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    setIsUsingWebcam(false);

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      setError("Error reading file");
    };
    reader.readAsDataURL(file);
  };

  const capture = async () => {
    setIsUsingWebcam(true); // Indicate webcam usage
    const capturedImageSrc = webcamRef.current.getScreenshot();
    const image = new Image();
    image.onload = () => {
      setImageSrc(capturedImageSrc);
      decodeBarcode();
    };
    image.src = capturedImageSrc;
  };

  const decodeBarcode = async () => {
    if (!imageSrc) return;
    const reader = new BrowserPDF417Reader();

    const hints = {
      TRY_HARDER: true,
      POSSIBLE_FORMATS: "PDF_417",
      ALSO_INVERTED: true,
    };

    try {
      // Apply preprocessing techniques if necessary
      const preprocessedImageSrc = preprocessImage(imageSrc);
      // Decode from preprocessed image using added hints
      const result = await reader.decodeFromImageUrl(
        preprocessedImageSrc,
        hints
      );

      // Decode the result into an object
      const decodedData = decodeLicenseData(result.toString());

      // Update the state with the decoded information
      setResult(decodedData);
      setError(null);
    } catch (error) {
      console.error("Error decoding barcode:", error);
      setError(
        "Error decoding barcode please take a new picture or upload a picture of your license barcode"
      );
    }
  };

  const preprocessImage = (imageSrc) => {
    // Convert imageSrc to an Image object
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    return canvas.toDataURL("image/jpeg");
  };

  const switchSource = () => {
    setIsUsingWebcam(!isUsingWebcam);
  };

  const reset = () => {
    setImageSrc(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="decoder-main">
      <header>
        <h1>Driver&apos;s License Decoder</h1>
        <h3>
          PLEASE UPLOAD OR TAKE A PICTURE OF YOUR DRIVER&apos;S LICENSE BARCODE
          TO DECODE
          {/* Please take a picture of your drivers license barcode to decode */}
        </h3>
      </header>
      <div className="decoder-container">
        <DecoderControls
          isUsingWebcam={isUsingWebcam}
          imageSrc={imageSrc}
          decodeBarcode={decodeBarcode}
          reset={reset}
          webcamRef={webcamRef}
          fileRef={fileRef}
          capture={capture}
          switchSource={switchSource}
          handleFileChange={handleFileChange}
        />
        <Results result={result} error={error} />
      </div>
      <footer>
        <a href="https://github.com/MartyKinter/DriversLicenseDecoder">
          View code on GitHub
        </a>
      </footer>
    </div>
  );
};

export default BarcodeScanner;
