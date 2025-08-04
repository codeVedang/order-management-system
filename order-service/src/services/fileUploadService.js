const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { s3 } = require('../config/aws');

// Configure multer to use S3 for storage
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        acl: 'public-read', // Makes the uploaded files publicly readable via URL
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            // Creates a unique filename to prevent overwrites
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const extension = path.extname(file.originalname);
            cb(null, 'invoices/' + file.fieldname + '-' + uniqueSuffix + extension);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: (req, file, cb) => {
        // Allow only PDF files
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only PDF is allowed!'), false);
        }
    }
});

module.exports = upload;