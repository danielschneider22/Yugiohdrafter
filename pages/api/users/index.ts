import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
        switch (req.method) {
            case 'GET': {
                return res.send(req.session.user?.isAuth ? req.session?.user.email : "No active session");
            }
        }
    },
    {
        cookieName: "user",
        password: "HswQ64dwc3E1dmvFL8LyTE5Cz5zda3eP",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    }
)