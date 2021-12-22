import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = 'fmicourse';

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await UserModel.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveCode = async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;

  try {
    let user = await UserModel.findById(id);
    user.code = code;
    await user.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (!oldUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: { _id: oldUser._id, email: oldUser.email, name: oldUser.name, img: oldUser.img, code: oldUser.code}, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, img, code } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ name, email, password: hashedPassword, img, code });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result: { _id: result._id, email: result.email, name: result.name, img: result.img, code: result.code }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
