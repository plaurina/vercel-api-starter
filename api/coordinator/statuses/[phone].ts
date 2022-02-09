import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  const {phone} = req.query;
  console.log("getStatuses, phone = {}", phone)
  let queryStr = "SELECT" +
    " u.phone as phone, u.name as name, u.status as status, u.location as location, r.lat as lat, r.lng as lng " +
    " FROM users u " +
    " WHERE u.coordinator = ? AND u.iscoordinator = false";
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

    const [ren] = await conn.query("SELECT lat, lng FROM rendezvous WHERE coordinator = ?", [phone])
    let rendezvous = {
      lat: ren[0].lat,
      lng: ren[0].lng
    }

    res.status(200).json(
      {
        phone: phone,
        rendezvous: rendezvous,
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