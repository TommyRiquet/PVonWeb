//const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
import { User } from "../models/User";
import { AppDataSource } from "../config/database";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRepository = AppDataSource.getRepository(User);
	
    const user = await userRepository.findOneBy({
		email:  email
	});

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //const isPasswordValid = await argon2.verify(user.password, password);

	const isPasswordValid = user.password === password;

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
