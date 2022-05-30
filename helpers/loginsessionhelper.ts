import { NextApiRequest } from "next";

export async function addUserToSession(req: NextApiRequest, email: string){
  req.session.user = {
    isAuth: true,
    email,
  };
  await req.session.save();
}