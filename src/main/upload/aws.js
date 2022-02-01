const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAXDJPOY3AAQM4KPFE',
    secretAccessKey: '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'
})

module.exports = {
    upload: function (name) {
        return new Promise(function (resolve, reject) {
            let file = `${__dirname}/../../../public/screenshots/${name}`;
            fs.readFile(file, 'base64', function (err, data) {
                if (err) {
                    console.log('error in reading file', err);
                    reject({ msg: 'error in reading file', err });
                } else {
                    console.log('file is read: ----- ')
                    //AWS params to send data
                    var params = {
                        Bucket: 'test-bucket-zasya',
                        Key: name,
                        Body: data
                    }
                    s3.upload(params, (err, data1) => {
                        if (err) {
                            reject(err)
                        }
                        // fs.unlink(file, function(err, result) { console.log('--- file removed ---') });
                        resolve(data1.Location)
                    })
                }
            })
        })
    }
}