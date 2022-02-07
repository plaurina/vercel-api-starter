import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');


export default async (req: NowRequest, res: NowResponse) => {
  let body = JSON.parse(req.body)

  const [isActiveRow] = await conn.query("SELECT coordinator, startDt, endDt FROM emergencies where coordinator = ? and endDt is null",
    [body.phone])

  if (isActiveRow && isActiveRow.length > 0) {
    res.status(400).json({
      error: "Emergency is already active",
      startDt: isActiveRow[0].startDt
    })
  } else {
    const [emergency] = await conn.query("INSERT INTO emergencies (coordinator) VALUES (?) ", [body.phone]);
    const [existingRendezvous] = await conn.query("SELECT id from rendezvous WHERE coordinator = ?", [body.phone]);

    let rendezvous = null
    if (existingRendezvous && existingRendezvous.length > 0) {
      rendezvous = await conn.query("UPDATE rendezvous SET lat = ?, lng = ? WHERE id = ?",
        [body.rendezvous.lat, body.rendezvous.lng, existingRendezvous.id])
    } else {
      rendezvous = await conn.query("INSERT INTO rendezvous (coordinator, lat, lng) VALUES(?, ?, ?)",
        [body.phone, body.rendezvous.lat, body.rendezvous.lng, existingRendezvous.id])
    }


    res.status(200).json({
      phone: body.phone,
      rendezvous: {
        lat: body.rendezvous.lat,
        lng: body.rendezvous.lng
      }
    })
  }
}
