import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send({ ok: true });
},
{
  cookieName: "user",
  password: "HswQ64dwc3E1dmvFL8LyTE5Cz5zda3eP",
  cookieOptions: {
      secure: process.env.NODE_ENV === "production",
  },
}
)