const fs = require("node:fs");
const fileName = process.argv[2];

const stream = fs.createReadStream(fileName, { encoding: "utf-8" });
let count = 0;
let byteCnt = 0;
let ch = "";

stream.on("data", (chunk) => {

    for (let i = 0; i < chunk.length; ++i) {
        if (chunk[i] === '\t' || chunk[i] === '\n' || chunk[i] === ' ') {
            if (ch && ch != '\t' && ch != '\n' && ch != ' ') {
                count++
            }
        }
        ch = chunk[i];
    }
    byteCnt += chunk.length;

});

stream.on("end", () => {
    if (ch && ch != '\t' && ch != '\n' && ch != ' ') {
        count++
    }
    console.log(`${count} words \n${byteCnt} bytes`)
})