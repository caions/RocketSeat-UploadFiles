const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
	accessKeyId: 'AKIAQOVG7X7SE4QND5WQ',
	secretAccessKey: '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',
    Bucket: 'uploadcaions',
    defaultRegion: 'us-east-1',
});

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(5, (erro, hash) => { //quantidade de bytes de caracteres antes do nome
                if (erro) cb(erro)

                const filename = `${hash.toString('hex')}-${file.originalname}`;
                
                cb(null, filename)
            })
        }
    }),
    s3: multerS3({
        s3: s3,
		bucket: 'uploadcaions',
		acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
          crypto.randomBytes(16, (err, hash) => {
            if (err) cb(err);
    
            const fileName = `${hash.toString("hex")}-${file.originalname}`;
    
            cb(null, fileName);
          });
        }
      })
    };

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes["s3"],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Invalid file type'))
        }
    }

}