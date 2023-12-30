const User = require("../app/models/UserModel");
const bcrypt = require("bcrypt");
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, phone } = newUser;
    try {
      const isCheckEmail = await User.findOne({ email: email });

      if (isCheckEmail !== null) {
        resolve({
          status: "OK",
          message: "The email is already",
        });
      }
      const hash = bcrypt.hashSync(password, 10);
      const data = await User.create({
        name,
        email,
        password: hash,
        confirmPassword: hash,
        phone,
      });

      if (data) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, password } = newUser;
    try {
      const checkUser = await User.findOne({ name: name });

      if (checkUser == null) {
        resolve({
          status: "OK",
          message: "The name fail",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "OK",
          message: "The password fail",
        });
      }

      const access_token = await generalAccessToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await generalRefreshToken({
        id: checkUser._id,
        isAdmin: checkUser.isAdmin,
      });

      console.log("access_token", access_token);

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The ID user is not defined",
        });
      }

      const updateUser = await User.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = { createUser, loginUser, updateUser };
