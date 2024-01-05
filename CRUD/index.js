const http = require("http");
const uuid = require("uuid");
const data = require("./data.json");
const fs = require("fs");
class Server {
  constructor() {}
  retrieveBody(req) {
    return new Promise((resolve, reject) => {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          resolve(body);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  returnFunc(status, data, res) {
    res.writeHead(status, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(data));
  }
  get_users(res) {
    this.returnFunc(200, data, res);
  }
  async add_user(req, res) {
    const data = await this.retrieveBody(req);
    const createdData = {
      ...JSON.parse(data),
      id: uuid.v4(),
    };
    let dataJSON = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    dataJSON.push(createdData);
    fs.writeFileSync("./data.json", JSON.stringify(dataJSON));

    this.returnFunc(201, data, res);
  }
  async update_user(req, res, url) {
    const id = url.split("/").reverse()[0];
    let dataJSON = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const foundUser = dataJSON.find((user) => user.id == id);
    if (!foundUser) return res.end("User not found");
    const data = JSON.parse(await this.retrieveBody(req));
    dataJSON = dataJSON.map((user) =>
      user.id == id ? { ...foundUser, ...data } : user
    );
    fs.writeFileSync("./data.json", JSON.stringify(dataJSON));

    this.returnFunc(201, dataJSON, res);
  }
  async delete_user(req, res, url) {
    const id = url.split("/").reverse()[0];
    let dataJSON = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    if (!id) return res.end("User not found");
    dataJSON = dataJSON.filter((user) => user.id != id);
    fs.writeFileSync("./data.json", JSON.stringify(dataJSON));
    this.returnFunc(201, dataJSON, res);
  }
  handler_server(url, method, req, res) {
    if (url === "/user" && method == "GET") {
      this.get_users(res);
    } else if (url === "/user" && method == "POST") {
      this.add_user(req, res);
    } else if (url.match(/\/user\/\w+/) && method == "PUT") {
      this.update_user(req, res, url);
    } else if (url.match(/\/user\/\w+/) && method == "DELETE") {
      this.delete_user(req, res, url);
    }
  }
  start_server() {
    const server = http.createServer(async (req, res) => {
      const url = req.url;
      const method = req.method;
      this.handler_server(url, method, req, res);
    });

    server.listen(8080, () => {
      console.log("Server listening on http://localhost:8080");
    });
  }
}

const server = new Server();
server.start_server();
