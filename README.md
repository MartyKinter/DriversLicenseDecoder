# Title

Driver's License Barcode Decoder

## Demo website

![demo gif](/Drivers-license-decoder.gif)
(for safety concerns this is not my real address)

https://licensedecoder.onrender.com/

## Introduction

This project utilizes React-webcam to access a user's webcam and implements Zxing to decode the PDF417 barcode located on the back of their driver's license.

## Outline

The user can either take a picture of their licensse barcode with the webcam or upload an image of the license barcode.
For best results when uploading, the image should be cropped to include just the barcode. After capturing or uploading an image,
users can decode the barcode by simply clicking the "Decode" button.

Once the barcode is decoded it parses the result using the standardized 3-digit codes set by the government to match
them to their corresponding values.

The biggest obstacle I encountered while making this project was the fact that Zxing seems to struggle to decode barcodes
if the image quality is low. To help overcome this I added some of the available configurations for Zxing such as "try_harder"
to increase accuracy. I also added the ability for a user to upload an image of their barcode, so they can take a picture with their phone (since it usually has a better camera than a computer webcam) and upload the barcode that way.

Initially for this project I explored the use OCR (optical character recognition) to read the data from the front of the
license and display the text that it read. But this method produced unreliable text output and often unreadable text.
By decoding the data from the barcode instead, the results were much more reliable and required less image processing.

Moving forward different preprocessing techniques could be added to sharpen or clean up the images taken by the user's webcam.

## Technologies Used

- React
- React-webcam
- Zxing
