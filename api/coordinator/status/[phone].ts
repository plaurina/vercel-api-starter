import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  const {phone} = req.query;
  const [rows, fields] = await conn.query("SELECT " +
    "phone, name, status, location " +
    "FROM users where coordinator = ? " +
    "AND iscoordinator = false", [phone])
  res.status(200).json(
    {
      phone: phone,
      users: rows,
    });
};
