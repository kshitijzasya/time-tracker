const fs  = require('fs');
const AWS = require('aws-sdk');

module.exports = {
    upload: function(name) {
        return new Promise(function(resolve, reject){
            fs.readFile(`${__dirname}/../../../public/screenshots/${name}`, 'base64', function(err, data){
                if(err){
                    console.log('error in reading file', err);
                    reject({ msg: 'error in reading file', err });
                }else{
                    console.log('file is read: ----- ')
                    resolve(data);
                }
            })
        })
    }
}