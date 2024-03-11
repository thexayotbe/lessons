import Users from "./user";
const user = new Users("Xayotbek", "Mamajonov");
const createdUser = user.addUser({
  name: "Xayotbek",
  surname: "Mamajonov",
  age: 17,
  email: "xayotbek@gmail.com",
  phoneNumber: "+998950096166",
});
// console.log(user.deleteUser(createdUser._id));
console.log(createdUser._id, { ...createdUser, name: "Husan" });
console.log(user.sayHi(createdUser._id));
console.log(user.db);
