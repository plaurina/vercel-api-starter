import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  let body = JSON.parse(req.body)
  console.log("inputs: ", body.phone)
  var result = await conn.query("UPDATE users SET status = 'UNKNOWN' WHERE phone = ?", [body.phone])

  console.log("result = ", result)
  if (result) {
    res.status(200).json({})
  } else {
    res.status(400).json({
      error: "Error occured setting status for user - you sure that users exists?",
    })
  }
}