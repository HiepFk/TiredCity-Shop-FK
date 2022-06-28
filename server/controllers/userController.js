const User = require("../models/userModel");

const filterObj = (obj, ...notallowed) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (!notallowed.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

const userController = {
  addUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(200).json({
        status: "success",
        message: "Thêm người dùng thành công",
        data: { saveUser },
      });
    } catch (error) {
      res.status(404).json(error);
      // res.status(404).json({
      //   status: "error",
      //   message: "Thêm người dùng thất bại",
      // });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: `Cập nhật không thành công`,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const query = User.find(queryObj);
      const users = await query;
      res.status(200).json({
        status: "success",
        results: users.length,
        data: { users },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.id });
      if (user) {
        res.status(200).json({
          status: "success",
          data: { user },
        });
      } else {
        res.status(200).json({
          status: "error",
          message: "Không có người dùng",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const doc = await User.findByIdAndDelete(req.params.id);

      if (!doc) {
        res.status(404).json({
          status: "error",
          message: "Không tìm thấy với id ",
        });
        return;
      }
      res.status(204).json({
        status: "success",
        message: "Xóa thành công",
      });
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  },

  updateMe: async (req, res, next) => {
    try {
      if (req.body.password || req.body.passwordConfirm || req.body.role) {
        res.status(400).json({
          message: "This route is not allowed to be update passWord or Role!",
        });
        return;
      }
      const filterBody = filterObj(req.body, "role", "password");
      const user = await User.findByIdAndUpdate(req.user.id, filterBody, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        message: "Cập nhật thành công",
        data: { user },
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Cập nhật thất bại",
      });
    }
  },
  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.status(200).json({
        status: "success",
        data: { user },
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
