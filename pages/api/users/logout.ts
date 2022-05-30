import { NextApiRequest, NextApiResponse } from "next";
import nextSession from "next-session";

const getSession = nextSession();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userSession = await getSession(req, res);
  userSession.destroy();
}