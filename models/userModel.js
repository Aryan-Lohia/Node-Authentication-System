const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter a Username"],
    unique: true,
    lowercase: [true, "Username should be lowercase"],
  },
  password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minlength: [6, "Minimum length of password is 6"],
    unique: false,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Username");
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
