const fs = require("node:fs/promises");
const path = require("node:path");

async function rotateLog(filePath, limit) {
    try {
        const stats = await fs.stat(filePath);
        const parsed = path.parse(filePath);
        const name = parsed.name;
        const ext = parsed.ext;


        if (stats.size < limit) {
            console.log(`${filePath} is ${stats.size} bytes -- under the limit, no rotation needed.`);
        } else {
            const stamp = new Date().toISOString();
            const timestamp = stamp.replaceAll(":", "-").replace(".", "-");
            const archivedName = name + "-" + timestamp + ext;
            const archivedPath = path.join(parsed.dir, archivedName);
            await fs.rename(filePath, archivedPath);
            await fs.writeFile(filePath, "");
        }
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log(`No log file yet at ${filePath} -- nothing to rotate`);
            return;
        }
    }
}

rotateLog("app.log", 1000);