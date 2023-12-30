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

console.log(os.platform());
console.log(os.arch());
console.log(os.cpus());
console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime());
console.log(os.hostname());
console.log(os.networkInterfaces());
