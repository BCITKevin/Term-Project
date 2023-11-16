const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date:
 * Author:
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");


IOhandler.unzip(zipFilePath, pathUnzipped)
IOhandler.readDir(pathUnzipped)
    .then((pathIn) => {
        pathIn.forEach((i) => IOhandler.grayScale(i))
        console.log(pathIn)
        Promise.all([
            IOhandler.grayScale(pathIn[0]),
            IOhandler.grayScale(pathIn[1]),
            IOhandler.grayScale(pathIn[2]),
        ]).then(() => console.log("All images filtered!"));
    })
    .then(() => console.log("done"))
    .catch((err) => console.log(err));
