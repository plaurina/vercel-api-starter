import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  const {phone} = req.query;
  console.log("getStatuses, phone = {}", phone)
  let queryStr = "SELECT" +
    " phone, name, status, location " +
    " FROM users where coordinator = ?" +
    " AND iscoordinator = false";
  console.log("queryStr = {}", queryStr)
  const [rows, fields] = await conn.query(queryStr, [phone])

  console.log("rows: ", rows)

  if (rows && rows.length > 0) {
    console.log("rows exists, count = {}", rows.length)

    rows.map(row => {
      return {
        phone: row.phone,
        name: row.name,
        status: row.status,
        location: row.location,
      }
    })


    for (const row of rows) {
      let [comments] = await getComments(row.phone)
      row.comments = comments
    }

    res.status(200).json(
      {
        phone: phone,
        users: rows,
      });

  } else {
    console.log("rows not found")

    res.status(404).json({})
  }

};

async function getComments(phone){
  return await conn.query("SELECT " +
    "createdDt as datetime, comment " +
    "FROM comments where phone = ? ", [phone])
}