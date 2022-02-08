const { desktopCapturer, screen, ipcMain } = require('electron');
const fs = require('fs');
const { upload } = require('../upload/aws');
/**
 * Start taking screenshots
 * @param type
*/
const startTakingScreenshots = (type) => {
    return new Promise((resolve, reject) => {
        try {
            console.log('---- going through the screenshot process ----')
            let screenSize = screen.getPrimaryDisplay().workAreaSize;
            desktopCapturer.getSources({ types: ['screen'], thumbnailSize: screenSize }).then(sources => {
                // let sourceId = sources[0].id;
                resolve(sources[0].thumbnail.toDataURL());
            })
                .catch(err => reject({ msg: 'error in startTakingScreenshots', error: err }))
        } catch (e) {
            reject({ msg: 'error in startTakingScreenshots', error: err });
        }
    })
}

const handleStream = (data, interval) => {
    return new Promise(function (resolve, reject) {
        //Replacing and writing the stream to a file
        console.log('---- saving the image to directory ----')
        data = data.replace(/^data:image\/png;base64,/, "");
        let timestamp = new Date().getTime();
        let name = `Screeenshot-${timestamp}.png`;
        fs.writeFile(`${__dirname}/../../../public/screenshots/${name}`, data, 'base64', function (err, data) {
            if (err) {
                console.log('error in writing file', err);
                reject({ msg: 'error in writing file', err });
            } else {
                console.log('-- file is saved --')
                //Upload screenshot to AWS
                uploadFileToAwsAndDb(name, interval)
                .then(res => resolve({ msg: 'file is saved', location: res, interval, name}))
                .catch(err => reject({ msg: 'error in uploadFileToAwsAndDb', error: err }));
            }
        })
    })
}

const uploadFileToAwsAndDb = ( name ) => {
    return new Promise(function (resolve, reject) {
        upload(name)
        .then(location => resolve(location))
        .catch(err => reject(err))
    })
}

module.exports = {
    startTakingScreenshots,
    handleStream
}