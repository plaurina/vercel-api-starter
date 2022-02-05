import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  const {phone} = req.query;
  const [rows] = await conn.query("SELECT " +
    "now() as datetime, u.status, u.location, " +
    "c.phone as coordinator_phone, c.name as coordinator_name, c.location as coordinator_location, " +
    "r.lat as r_lat, r.lng as r_lng " +
    "FROM users u " +
    "LEFT JOIN users c ON u.coordinator = c.phone " +
    "LEFT JOIN rendezvous r on r.coordinator = c.phone " +
    "WHERE u.phone = ? ", [phone])

    let row = rows[0]
    row.me = {}
    row.coordinator = {}
    row.rendezvous = {}
    row.me.status = row.status
    row.me.location = row.location
    row.coordinator.phone = row.coordinator_phone
    row.coordinator.name = row.coordinator_name
    row.coordinator.location = row.coordinator_location
    row.rendezvous.lat = row.r_lat
    row.rendezvous.lng = row.r_lng
    delete row.status
    delete row.location
    delete row.coordinator_phone
    delete row.coordinator_name
    delete row.coordinator_location
    delete row.r_lat
    delete row.r_lng

  res.status(200).json(row)

};
