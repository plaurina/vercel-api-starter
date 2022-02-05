import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  const {phone} = req.query;
  const [rows] = await conn.query("SELECT " +
    "phone, name, status, location " +
    "FROM users where coordinator = ? " +
    "AND iscoordinator = false", [phone])

  rows.map(row => {
    return {
      phone: row.phone,
      name: row.name,
      status: row.status,
      location: row.location,
    }
  })

  for (const row of rows) {
    let comments = await getComments(row.phone)
    row.comments = comments
  }
  res.status(200).json(
    {
      phone: phone,
      users: rows,
    });
};

async function getComments(phone){
  const [rows] = await conn.query("SELECT " +
    "createdDt as datetime, comment " +
    "FROM comments where phone = ? ", [phone])
  return rows
}