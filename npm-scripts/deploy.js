const fs = require('fs');
const ChromeWebstoreUpload = require('chrome-webstore-upload');

let REFRESH_TOKEN = process.env.REFRESH_TOKEN;
let EXTENSION_ID = process.env.EXTENSION_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let CLIENT_ID = process.env.CLIENT_ID;

const webStore = ChromeWebstoreUpload({
    extensionId: EXTENSION_ID,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN
});

// creating file stream to upload
const extensionSource = fs.createReadStream('dist/close-other-tabs.zip');

// upload the zip to webstore
webStore.uploadExisting(extensionSource).then(res => {
    console.log('Successfully uploaded the ZIP');

    // publish the uploaded zip
    webStore.publish().then(res => {
        console.log('Successfully published the newer version');
    }).catch((error) => {
        console.log(`Error while publishing uploaded extension: ${error}`);
        process.exit(1);
    });

}).catch((error) => {
    console.log(`Error while uploading ZIP: ${error}`);
    process.exit(1);
});