import axios from "axios";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import querystring from "querystring";
import { User } from "../models/userModel.js";

interface UserType {
  name: string;
  email: string;
}

// google authentication
export const authGoogle = async (
  req: Request<{}, {}, UserType>,
  res: Response
) => {
  try {
    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:4500/google/callback&scope=profile%20email`;
    res.redirect(redirectUri);
  } catch (error: any) {
    console.log('1',error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const authGoogleCallback = async (
  req: Request<{}, {}, UserType, { code: string }>,
  res: Response
) => {
  try {
    const { code } = req.query;
    if (typeof code !== "string") {
      return res.status(400).json({ error: "Invalid authorization code" });
    }
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      querystring.stringify({
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: `${process.env.BACKEND_URL}/google/callback`,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const { access_token } = tokenResponse?.data;

    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = await userResponse?.data;
    const isExistUser = await User.findOne({ where: { email: user?.email } });

    if (isExistUser) {
      const token = jwt.sign(
        { _id: isExistUser?.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "365d",
        }
      );
      return res.redirect(`${process.env.FRONT_URL}/?token=${token}`);
    } else {
      console.log('user',user)
      const newUser = await User.create({
        name: user?.name,
        picture: user?.picture,
        email: user?.email,
      });
      const token = jwt.sign(
        { _id: newUser?.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "365d",
        }
      );
      return res.redirect(`${process.env.FRONT_URL}/?token=${token}`);
    }
  } catch (error: any) {
    console.log('2',error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
