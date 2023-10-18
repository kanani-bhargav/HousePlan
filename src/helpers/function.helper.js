const fs = require('fs');

/************************************ Generate response/error message function ****************************************************/
const validationFile = require('../config/validation.json');
const attributesFile = require('../config/attributes.json');

/**
 * Generate response/error message.
 * @param {Object} req
 * @param {String} validation
 * @param {String} attribute
 * @returns
 */
const generateMessage = (validation, attribute) => {
    let message = '';

    if (!validationFile[validation] || !attributesFile[attribute]) {
        /**
         * Data add in missing file.
         * @param {String} filePath
         * @param {String} data
         */
        const appendDataInMissingFile = (filePath, data) => {
            let fileData = { [data]: data };

            if (fs.existsSync(filePath)) {
                let file = fs.readFileSync(filePath, 'utf8');
                fileData = { ...JSON.parse(file), ...fileData };
            } // If the file exists, the file data is merged with the new data.

            fs.writeFileSync(filePath, JSON.stringify(fileData)); // Create or append data to a file.
        };

        if (!validationFile[validation]) {
            appendDataInMissingFile('./src/config/validation.missing.json', validation); // If validation doesn't exist in validationFile, validation add in validation.missing.json file.
        }

        if (!attributesFile[attribute]) {
            appendDataInMissingFile('./src/config/attribute.missing.json', attribute);
        } // If attribute doesn't exist in attributesFile, attribute add in attribute.missing.json file.

        message = validation;
    }

    if (validationFile[validation]) {
        message = validationFile[validation].replace(
            '{{attribute}}',
            attributesFile[attribute] ?? attribute
        );
    } // If validation exist in validationFile,replace attribute to validation of attribute.

    return message;
};

module.exports = {
    generateMessage,

};
