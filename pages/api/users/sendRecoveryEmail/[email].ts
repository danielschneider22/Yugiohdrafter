import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../mongodb";
import { v4 as uuidv4 } from 'uuid';
import { reset_pwd_key } from "../../../../constants/emailkey";
import { resetPasswordDict } from "../../../../state/resetPasswords";
const axios = require("axios")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { collections } = await connectToDatabase();
  
  const users = await collections.users?.find().toArray()!
  const email = req.query.email as string
  const user = users.find((user) => user.email === email)
  if (!user) {
    return res.status(400).json({ error: "A user does not exist with this email address" })
  }

  const randomId = uuidv4()
  
  const template_params = {
    reset_password_link: process.env.NODE_ENV === "production" ? `yugiohdrafter.com/resetPassword?token=${randomId}` : `localhost:3002/resetPassword?token=${randomId}`,
    send_to: email
  }

  var data = {
    service_id: reset_pwd_key.SERVICE_ID,
    template_id: reset_pwd_key.TEMPLATE_ID,
    user_id: reset_pwd_key.USER_ID,
    template_params,
    accessToken: "fd5a6b1c8fb97909cddadeaa79c74dbd"
  };

  const headers = { 'Content-Type': 'application/json' }
  axios.post('https://api.emailjs.com/api/v1.0/email/send', JSON.stringify(data), { headers })
    .then(() => {
      resetPasswordDict[randomId] = email
      res.send("Success")
    })
    .catch((err: any) => {
      res.status(500).send(err.response.data)
  });
}