const config = require('../config/config');
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
    region: config.aws.region,
    accessKeyId: config.aws.access_key,
    secretAccessKey: config.aws.secret_key,
});

/** Upload image on AWS S3 bucket */
const s3Upload = async (fileKeyPath, fileBuffer) => {
    const uploadParams = {
        Bucket: config.aws.bucket_name,
        Key: fileKeyPath,
        Body: fileBuffer,
        acl: 'public-read',
    };

    s3.upload(uploadParams, function (err, data) {
        if (err) {
            return { status: false, message: err.message };
        } else {
            return { status: true, message: 'Upload successfully!', data };
        }
    });
};

/** Delete image on AWS S3 bucket */
const s3Delete = async (fileKeyPath) => {
    const params = {
        Bucket: config.aws.bucket_name,
        Key: fileKeyPath,
    };

    s3.deleteObject(params, function (err, data) {
        if (err) {
            return { status: false, message: err.message };
        } else {
            return { status: true, message: 'Delete successfully!', data };
        }
    });
};

const s3PutObject = async (fileKeyPath, fileData) => {
    const params = {
        Bucket: config.aws.bucket_name,
        Key: fileKeyPath,
        Body: fileData, // The data you want to upload (e.g., a buffer or stream).
    };

        s3.putObject(params, (err, data) => {
            if (err) {
                return({ status: false, message: err.message });
            } else {
                return({ status: true, message: 'Upload successful!', data });
            }
        });
}

module.exports = { s3Upload, s3Delete,s3PutObject };
