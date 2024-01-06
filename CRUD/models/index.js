let user_data = require("../lib/data.json");
const uuid = require("uuid");
const fs = require("fs");
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
const returnFunc = (status, data, res, user_data) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(data));
};

const bodyHandler = async (data, required) => {
  let result = "Please enter";
  required.map((value) =>
    Object.keys(JSON.parse(data)).includes(value)
      ? value
      : (result += ` ${value}`)
  );

  if (result === "Please enter") return null;

  throw new Error(result);
};

module.exports = class User {
  constructor() {
    this.get = (req, res) => {
      returnFunc(200, user_data, res);
    };
    // ! POST
    this.post = async (req, res) => {
      try {
        const data = await retrieveBody(req);
        await bodyHandler(data, ["name", "surname", "city"]);

        const createdData = {
          ...JSON.parse(data),
          id: uuid.v4(),
        };
        user_data.push(createdData);
        fs.writeFileSync("./lib/data.json", JSON.stringify(user_data));
        returnFunc(201, data, res, user_data);
      } catch (error) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            Error: error.message,
          })
        );
      }
    };
    this.update = async (req, res, url) => {
      try {
        const data = await retrieveBody(req);
        await bodyHandler(data, ["name", "surname", "city"]);

        const id = url.split("/").reverse()[0];
        const foundUser = user_data.find((user) => user.id == id);
        if (!foundUser) return res.end("User not found");
        user_data = user_data.map((user) =>
          user.id == id ? { ...foundUser, ...JSON.parse(data) } : user
        );

        fs.writeFileSync("./lib/data.json", JSON.stringify(user_data));

        returnFunc(201, user_data, res, user_data);
      } catch (error) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({
            Error: error.message,
          })
        );
      }
    };
    this.delete = (req, res, url) => {
      const id = url.split("/").reverse()[0];
      if (!id) return res.end("User not found");
      user_data = user_data.filter((user) => user.id != id);
      fs.writeFileSync("./lib/data.json", JSON.stringify(user_data));

      returnFunc(201, user_data, res, user_data);
    };
  }
};
