import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { UserCookie } from "../../../constants/UserCookie";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send("Success");
},
  UserCookie
)