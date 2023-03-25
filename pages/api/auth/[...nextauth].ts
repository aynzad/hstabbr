import NextAuth from "next-auth";
import { NextApiHandler } from "next";
import { authOptions } from "@lib/auth/options";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);
export default authHandler;
