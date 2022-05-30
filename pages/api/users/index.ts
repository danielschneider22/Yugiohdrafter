import { Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../mongodb";
import nextSession from "next-session";

const getSession = nextSession();

const ObjectId = require('mongodb').ObjectId;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            return getActiveSession(req, res);
        }
    }
}

async function getActiveSession(req: NextApiRequest, res: NextApiResponse) {
    const userSession = await getSession(req, res);
    console.log(userSession)

    userSession.llama = "llama!"
    console.log(userSession)

    if (userSession.isAuth) {
      return res.send(userSession.email)
    } else {
      return res.send(("No active session"))
    }
}