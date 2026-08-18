const EventEmitter = require("node:events");

class Downloader extends EventEmitter {
    start() {
        let progress = 0;

        const interval = setInterval(() => {
            progress += 10;

            this.emit("progress", progress);

            if (progress === 100) {
                this.emit("done");
                clearInterval(interval);
            }
        }, 500);
    }
}

const downloader = new Downloader();

downloader.on("progress", (progress) => {
    console.log(progress);
});

downloader.on("done", () => {
    console.log("Download complete");
});

console.log("Downloading...");

downloader.start();