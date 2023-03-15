const argon2 = require("argon2")
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";


export const login = async (req: Request, res: Response) => {
	try {
	  const { email, password } = req.body;
	  const user = await User.findOne({ where: { email } });
	  if (!user) {
		return res.status(401).json({ message: "Invalid credentials" });
	  }
	  const isPasswordValid = await argon2.verify(user.password, password);
	  if (!isPasswordValid) {
		return res.status(401).json({ message: "Invalid credentials" });
	  }
	  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret");
	  res.json({ token });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Internal server error" });
	}
  };
  