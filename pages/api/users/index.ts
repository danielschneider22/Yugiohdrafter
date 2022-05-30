import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { UserCookie } from "../../../constants/UserCookie";

export default withIronSessionApiRoute(async function handler(req: NextApiRequest, res: NextApiResponse) {
        switch (req.method) {
            case 'GET': {
                return res.send(req.session.user?.isAuth ? req.session?.user.email : "No active session");
            }
        }
    },
    UserCookie
)