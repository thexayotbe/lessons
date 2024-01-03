const http = require("http");
const { resolve } = require("path");
const uuid = require("uuid");
const users = [
  { name: "Xayotbek", surname: "Mamajonov", age: 17, id: 1, city: "Namangan" },
];

const retrieveBody = (req) => {
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
};
const server = http.createServer(async (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method == "GET") {
    res.writeHead(200);
    return res.end("Welome to my server");
  } else if (url === "/user" && method == "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    return res.end(JSON.stringify(users));
  } else if (url === "/user" && method == "POST") {
    const data = await retrieveBody(req);
    console.log(JSON.parse(data));

    const createdData = {
      ...JSON.parse(data),
      id: uuid.v4(),
    };
    users.push(createdData);
    res.writeHead(201, {
      "Content-Type": "application/json",
    });
    return res.end(JSON.stringify(users));
  } else if (url.match(/\/user\/\w+/) && method == "PUT") {
    const id = url.split("/")[url.split("/").length - 1];
    const foundUser = users.find((user) => user.id == id);
    if (!foundUser) return res.end("User not found");
    const data = JSON.parse(await retrieveBody(req));

    res.writeHead(201, {
      "Content-Type": "application/json",
    });
    return res.end(
      JSON.stringify(
        users.map((user) => (user.id == id ? { ...foundUser, ...data } : user))
      )
    );
  } else if (url.match(/\/user\/\w+/) && method == "DELETE") {
    const id = url.split("/")[url.split("/").length - 1];
    const foundUser = users.find((user) => user.id == id);
    if (!foundUser) return res.end("User not found");

    res.writeHead(201, {
      "Content-Type": "application/json",
    });
    return res.end(JSON.stringify(users.filter((user) => user.id !== id)));
  }
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080");
});
