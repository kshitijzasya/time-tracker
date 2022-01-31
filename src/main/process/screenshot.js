const { desktopCapturer, screen } = require('electron');
const fs = require('fs');
const path = require * ('path');
const os = require('os');

var count = 0;
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

const handleStream = (data) => {
    return new Promise(function (resolve, reject) {
        //Replacing and writing the stream to a file
        console.log('---- saving the image to directory ----')
        data = data.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(`${__dirname}/../../../public/screenshots/screenshot-${count++}.png`, data, 'base64', function (err, data) {
            if (err) {
                console.log('error in writing file', err);
                reject({ msg: 'error in writing file', err });
            } else {
                resolve('file saved')
            }
        })
    })
}

module.exports = {
    startTakingScreenshots,
    handleStream
}