/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */


const fs = require("fs");
const PNG = require("pngjs").PNG;
const path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const AdmZip = require("adm-zip");
const unzip = (pathIn, pathOut) => {
    const zip = new AdmZip(pathIn);
    zip.extractAllTo(pathOut, true);
    console.log("Extraction operation complete");
};
/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if(err) console.log(err);
      else {
        const pngfiles = [];
        files.forEach(file => {
          if(file.endsWith(".png")) {
            pngfiles.push(file);
          }
        });
        resolve(pngfiles);
      }
    })

  })
    };

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

function makeDir() {
  fs.mkdir("grayscaled", (err) => {
    if(err) throw err;
  })
};

makeDir();

// Colour twist Version

// const grayScale = (pathIn) => {
//   fs.createReadStream(`./unzipped/${pathIn}`)
//   .pipe(
//     new PNG({
//       filterType: 4,
//     })
//   )
//   .on("parsed", function () {
//     for (var y = 0; y < this.height; y++) {
//       for (var x = 0; x < this.width; x++) {
//         var idx = (this.width * y + x) << 2;

//         this.data[idx] = 255 - this.data[idx];
//         this.data[idx + 1] = 255 - this.data[idx + 1];
//         this.data[idx + 2] = 255 - this.data[idx + 2];
//       }
//     }

//     this.pack().pipe(fs.createWriteStream(`grayscaled/${pathIn}`));
//   })
// }

const grayScale = (pathIn, pathOut) => {
  fs.createReadStream(`./unzipped/${pathIn}`)
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function() {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x <this.width; x++) {
        var idx = (this.width * y + x) << 2;

        const r = this.data[idx]
        const g = this.data[idx +1]
        const b = this.data[idx + 2]
        const gray = (r + g + b) / 3;
        
        this.data[idx] = gray;
        this.data[idx + 1] = gray;
        this.data[idx + 2] = gray;
      }
    }
    this.pack().pipe(fs.createWriteStream(`grayscaled/${pathIn}`))
  })
}

module.exports = {
  unzip,
  readDir,
  grayScale,
};
