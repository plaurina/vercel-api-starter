import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  let body = JSON.parse(req.body)

  const [isActiveRow] = await conn.query("SELECT id FROM emergencies where coordinator = ? and endDt is null", [body.phone])

  if (isActiveRow && isActiveRow.length > 0){
    const [updated] = await conn.query("UPDATE emergencies SET endDt = now() where id = ?", [isActiveRow[0].id])
    res.status(200).json({})
  } else {
    res.status(400).json({
      error: "There is no active emergency to end",
    })
  }
}
