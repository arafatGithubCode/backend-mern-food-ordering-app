import { Request, Response } from "express";
import User from "../models/user.model";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(currentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // check if the user exists
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send();
    }

    // create the user if it doesn't exist
    const newUser = new User(req.body);
    await newUser.save();

    // return the user object to the calling client
    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating new user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating the user" });
  }
};

export default { getCurrentUser, createCurrentUser, updateCurrentUser };
