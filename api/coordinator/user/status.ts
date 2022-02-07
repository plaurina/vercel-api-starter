import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  let body = JSON.parse(req.body)
  console.log("inputs: ", body.phone, body.user, body.status)
  var result = await conn.query("UPDATE users SET status = ? WHERE phone = ? AND coordinator = ?", [body.status, body.user, body.phone])

  console.log("result = ", result)
  if (result) {
    res.status(200).json({})
  } else {
    res.status(400).json({
      error: "There is no active emergency to end",
    })
  }
}