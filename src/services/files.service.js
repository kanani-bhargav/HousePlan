const fs = require('fs');
// const httpStatus = require('http-status');
const path = require('path');
// const { s3Upload } = require('./awsS3.service');



/**
 * Get requested file to return new file name
 * @param {*} file
 * @returns {String}
 */
const getFileName = (file) => {
    const ext = path.extname(file.originalname);
    return `file_${Date.now()}${ext}`;
};


/**
 * Validate image files
 * @param {Object} filesObj
 * @returns {Boolean}
 */
const validateImageFile = async (filesObj) => {
    try {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

        for (const key in filesObj) {
            if (Array.isArray(filesObj[key])) {
                for (const filename of filesObj[key]) {
                    const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
                    if (!allowedExtensions.includes(extension)) {
                        throw new ApiError(
                            httpStatus.BAD_REQUEST,
                            `${key} some files are not valid, please check once. allowed extensions are (${allowedExtensions})`
                        );
                    }
                }
            } else if (typeof filesObj[key] === 'string') {
                const extension = filesObj[key]
                    .substring(filesObj[key].lastIndexOf('.'))
                    .toLowerCase();
                if (!allowedExtensions.includes(extension)) {
                    throw new ApiError(
                        httpStatus.BAD_REQUEST,
                        `${key} file is not valid, please check once. allowed extensions are (${allowedExtensions})`
                    );
                }
            }
        }
        return true;
    } catch (error) {
        throw new ApiError(error.statusCode, error.message);
    }
};



/**
 * All file services are exported from here 👇
 */
module.exports = {
    getFileName,
    validateImageFile,
};
