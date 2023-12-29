const api = "https://greenshop.abduvoitov.com/api";
const accessToken = "6584927fc28f2c4ab0c9123d";

const bodyChecker = (value) => {
  let result = "Please enter ";
  for (const key in value) result += ` ${key}`;
  return result;
};

class User {
  constructor(name, surname, password, email) {
    this.email = "example@gmail.com";
  }
  async signup(data) {
    bodyChecker(data);
    const { name, surname, password, email } = data;
    const response = await fetch(
      `${api}/user/sign-up?access_token=${accessToken}`,
      {
        method: "POST",
        body: JSON.stringify({
          name,
          surname,
          password,
          email,
        }),
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }
  async signin(data) {
    bodyChecker(data);
    const { password, email } = data;
    const response = await fetch(
      `${api}/user/sign-in?access_token=${accessToken}`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }
  async get_wishlist() {
    const response = await fetch(
      `${api}/user/wishlist?access_token=${accessToken}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  async delete_wishlist(_id) {
    bodyChecker(_id);

    const response = await fetch(
      `${api}/user/wishlist?access_token=${accessToken}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
        }),
      }
    );
    return await response.json();
  }
}

//   "Mamajonov07",
// "xayotbekmm22@gmail.com"

const user = new User();

user
  .signin({ email: "mamajonovhayot300@gmail.com", password: "Xayotbek2007" })
  .then((data) => {
    // this.wishlist = data.data.user.wishlist;
    // console.log(this.wishlist);
    console.log(data);
  });

// user
//   .signup({
//     name: "Xayotbek",
//     surname: "Mamjonov",
//     email: "mamajonovhayot3000@gmail.com",
//     password: "Xayotbek22",
//   })
//   .then((data) => console.log(data));
// user.get_wishlist().then((data) => console.log(data));
// user.delete_wishlist("").then((data) => console.log(data));

// ! Flower id
// 64c49b325a0af4d1d5da6a3a
// 64c4b5068cb5d311588b698b
// 64ee3a715a790803e88cd523
// 64c499b05a0af4d1d5da6a35
