import { Request, Response } from "express";
import { BadRequestError } from "../errors";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Password } from "../services/password";

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError("Email in use");

  const user = User.build({ email, password });
  await user.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  req.session = {
    jwt: userJwt,
  };

  res.status(201).send({});
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new BadRequestError("Invalid credentials");

  const passwordsMatch = await Password.compare(
    existingUser.password,
    password
  );
  if (!passwordsMatch) throw new BadRequestError("Invalid credentials");

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },

    process.env.JWT_KEY!,
    {
      expiresIn: "2h",
    }
  );

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send({});
};

export const getCurrentUser = (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
};
