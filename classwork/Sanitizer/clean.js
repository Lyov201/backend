const fs = require("fs");
const path = require("path");

const buffer = fs.readdirSync("messy/");

fs.mkdirSync('Organized', {recursive: true});

for(let i = 0; i < buffer.length; ++i) {
    let element = buffer[i];
    const obj = path.parse(element);
    let newName = obj.name.toLowerCase();
    newName = newName.replace(/[^a-z0-9]+/g, "-");
    newName = newName.replace(/^-+|-+$/g, "");
    let newExt = obj.ext.toLowerCase();
    newName += newExt;

    const tmp = path.join("messy",element);
    const newTmp = path.join("Organized", newName);
    fs.copyFileSync(tmp, newTmp);
}


