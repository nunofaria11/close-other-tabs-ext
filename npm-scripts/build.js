const fs = require("fs-extra");
const glob = require("glob");
const archiver = require("archiver");

const options = {
    src: "src",
    staging: ".stag",
    dist: "dist",
    files: [
        "*.js",
        "manifest.json",
        "icons/*"
    ]
};

fs.emptyDirSync(options.staging);
fs.emptyDirSync(options.dist);

// Copy files to staging dir
for (const i in options.files) {
    const expression = options.files[i];
    const matches = glob.sync(expression, { cwd: options.src });

    for (const j in matches) {
        const file = matches[j];
        fs.copySync(options.src + "/" + file, options.staging + "/" + file);
    }
}

// Create ZIP file
const archive = archiver('zip', { zlib: { level: 9 } });
const zipOutput = options.dist + "/close-other-tabs.zip";
const stream = fs.createWriteStream(zipOutput);

archive.directory(options.staging, false)
    .on('error', err => console.error("Error while creating zip:", err))
    .pipe(stream);

stream.on('close', () => console.log("Build created successfully:", zipOutput));
archive.finalize();
