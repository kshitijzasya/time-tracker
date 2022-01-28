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
    try {
        let screenSize = screen.getPrimaryDisplay().workAreaSize;
        console.log('start taking screenshots....')
        return desktopCapturer.getSources({ types: ['screen'], thumbnailSize: screenSize }).then(async sources => {
            // let sourceId = sources[0].id;
            return handleStream(sources[0].thumbnail.toDataURL());
        })
    } catch (e) {
        console.log('error in startTakingScreenshots', e);
    }
}

const handleStream = async (stream) => {
    var regex = /^data:.+\/(.+);base64,(.*)$/;
    var matches = stream.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(`${__dirname}/../../../public/screenshots/screenshot-${count++}.${ext}`, buffer, function (err) {
        console.log('error in writing file', err);
    })
}

module.exports = {
    startTakingScreenshots
}