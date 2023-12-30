import { v4 } from "uuid";
class Users {
  constructor() {
    this.db = [];
  }
  addUser(record) {
    const newRecord = { ...record, _id: v4() };
    this.db = [...this.db, newRecord];
    return newRecord;
  }
  deleteUser(_id) {
    if (!_id) return "_id is required";
    this.db = this.db.filter((value) => value._id !== _id);
    return 1;
  }
  updateUser(_id, newRecord) {
    if (!_id) return "_id is required";
    this.db = this.db.map((value) => (value._id === _id ? newRecord : value));
    return 1;
  }
  sayHi(_id) {
    if (!_id) return "_id is required";
    const foundUser = this.db.find((value) => value._id === _id);
    if (!foundUser) return "User not found";
    return `Hello from ${foundUser.name} ${foundUser.surname}`;
  }
}

export default Users;
