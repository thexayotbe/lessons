// import path from "path";
const path = require("path");
const fs = require("fs");
const os = require("os");
// console.log(__dirname);
// console.log(__filename);

// console.log(path.basename(__filename)); // index.js
// console.log(path.dirname(__filename)); //C:\Users\Xayotbek\OneDrive\Desktop\Personal\Back-end\node_def_modules
// console.log(path.extname(__filename)); // .js
// console.log(path.extname("user/index.html")); // .html
// console.log(path.parse(__filename)); // set of path
// console.log(path.join(__filename, "index", "foo"));

// ! FS - file system
// fs.mkdir(path.join(__dirname, "new-folder"), (err) => {
//   console.log(err);
// });

// fs.writeFile(path.join(__dirname, "index.txt"), "Salom from me", (err) =>
//   console.log(err)
// );
// fs.appendFile(path.join(__dirname, "index.txt"), "Salom from others", (err) =>
//   console.log(err)
// );

// fs.readFile(path.join(__dirname, "index.txt"), "utf-8", (err, data) =>
//   console.log(data)
// );
// fs.rename(
//   path.join(__dirname, "index.txt"),
//   path.join(__dirname, "indexes.txt"),
//   (err) => console.log(err)
// );

// console.log(os.platform());
// console.log(os.arch());
// console.log(os.cpus());
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.uptime());
// console.log(os.hostname());
// console.log(os.networkInterfaces());

// ! _url module

// const url = require("url");
// console.log(url.parse("https://www.scriblify.me/?s=salom&range=10"));

// const url = new URL("https://www.scriblify.me/?s=salom&range=10");

// console.log(url.href);
// console.log(url.host);
// console.log(url.search);
// console.log(url.searchParams);

// const params = url.searchParams;

// params.append("current", 2);
// params.delete("range");

// console.log(params);

// console.log();

// ! event-emmiter module

// const EventEmmiter = require("events");

// const emitter = new EventEmmiter();

// emitter.once("message", () => {
//   console.log("Hello someone has sent a message to someone");
// });

// console.log(emitter.eventNames());
// emitter.emit("message");
// console.log(emitter.eventNames());

// ! http module
const http = require("http");

const server = http.createServer((req, res) => {
  // fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
  //   res.writeHead(200, {
  //     "Content-Type": "text/html ",
  //   });
  //   res.end(data);
  // });
  res.writeHead(200, {
    "Content-Type": "application/json ",
  });
  res.end(JSON.stringify({ name: "Xayotbek" }));
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
