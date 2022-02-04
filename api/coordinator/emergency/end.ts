import {NowRequest, NowResponse} from "@vercel/node";


export default (req: NowRequest, res: NowResponse) => {
  let body = JSON.parse(req.body)


  res.status(200).json({
    phone: body.phone
  });
}
