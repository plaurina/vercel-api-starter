import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";

const conn = new PSDB('main');

export default async (req: NowRequest, res: NowResponse) => {
  let body = JSON.parse(req.body)
  console.log("inputs: ", body.phone, body.comment)
  var result = await conn.query("INSERT INTO comments (phone, comment) VALUES (?,?)", [body.phone, body.comment])

  console.log("result = ", result)
  if (result) {
    res.status(201).json({})
  } else {
    res.status(400).json({
      error: "There is no active emergency to end",
    })
  }
}