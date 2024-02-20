/*
 *   This function takes the pdf417 data from driver's license barcde
 *   splits it on new lines and matches the first 3 characters with the standardized
 *   license codes to their corresponding values then creates a decodedData
 *   object with driver's info
 */

export function decodeLicenseData(barcodeData) {
    const dataElements = barcodeData.split("\n");
    const decodedData = {};

    for (const element of dataElements) {
        const elementId = element.slice(0, 3);
        const value = element.slice(3);

        switch (elementId) {
            case "DBA":
                decodedData.expirationDate = `${value.substring(0, 2)}-${value.substring(2, 4)}-${value.substring(4, 8)}`;
                break;
            case "DAC":
                decodedData.firstName = value;
                break;
            case "DAD":
                decodedData.middleName = value;
                break;
            case "DCS":
                decodedData.lastName = value;
                break;
            case "DBD":
                decodedData.issueDate = `${value.substring(0, 2)}-${value.substring(2, 4)}-${value.substring(4, 8)}`;
                break;
            case "DBB":
                decodedData.dateOfBirth = `${value.substring(0, 2)}-${value.substring(2, 4)}-${value.substring(4, 8)}`;
                break;
            case "DAG":
                decodedData.address = decodedData.address || {};
                decodedData.address.street = value;
                break;
            case "DAI":
                decodedData.address = decodedData.address || {};
                decodedData.address.city = value;
                break;
            case "DAJ":
                decodedData.address = decodedData.address || {};
                decodedData.address.state = value;
                break;
            case "DAK":
                decodedData.address = decodedData.address || {};
                decodedData.address.postalCode = value.substring(0, 5);
                break;
            case "DCG":
                decodedData.country = value;
                break;

            //Other optional barcode information

            // case "DBC":
            //   decodedData.gender = value;
            //   break;
            // case "DAY":
            //   decodedData.eyeColor = value;
            //   break;
            // case "DAU":
            //   decodedData.height = value;
            //   break;
            // case "DAQ":
            //   decodedData.cardholderId = value;
            //   break;
            // case "DCF":
            //   decodedData.documentId = value;
            // break;
            // case "DCA":
            //   decodedData.vehicleClass = value;
            //   break;
            // case "DCB":
            //   decodedData.restrictions = value;
            //   break;
            // case "DCD":
            //   decodedData.additionalPrivileges = value;
            //   break;
            // case "DDE":
            //   decodedData.lastNameTruncated = true;
            //   break;
            // case "DDF":
            //   decodedData.firstNameTruncated = true;
            //   break;
            // case "DDG":
            //   decodedData.middleNameTruncated = true;
            //   break;

            default:
                // Unknown element ID, do nothing
                break;
        }
    }

    //this could have been done by += each of the address pieces to decodedData.address when decoding but
    //I felt like it would be good to have access to street,city,state,postal code individually
    //in case it was needed for something later
    decodedData.fullAddress = `${decodedData.address.street}, ${decodedData.address.city}, ${decodedData.address.state} ${decodedData.address.postalCode}`;
    decodedData.fullName = `${decodedData.firstName} ${decodedData.lastName}`;

    console.log(decodedData);
    return decodedData;
}


