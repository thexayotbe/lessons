const http = require("http");
const User = require("./models/index");
const user = new User();
const handler_server = (url, method, req, res) => {
  if (url === "/user" && method == "GET") {
    user.get(req, res);
  } else if (url === "/user" && method == "POST") {
    user.post(req, res);
  } else if (url.match(/\/user\/\w+/) && method == "PUT") {
    user.update(req, res, url);
  } else if (url.match(/\/user\/\w+/) && method == "DELETE") {
    user.delete(req, res, url);
  }
};

const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;
  handler_server(url, method, req, res);
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080");
});
