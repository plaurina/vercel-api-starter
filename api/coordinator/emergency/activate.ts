import {NowRequest, NowResponse} from "@vercel/node";
import {PSDB} from "planetscale-node";
var AWS = require('aws-sdk');

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


    var updatedStatuses = await conn.query("UPDATE users SET status = 'UNKNOWN' WHERE coordinator = ?", body.phone)

    const [userPhones] = await conn.query("SELECT name, phone FROM users WHERE coordinator = ?", body.phone)
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    for (const userPhone of userPhones) {
      if (userPhone.phone && userPhone.phone.includes("555")) {
        console.log("skipping sms for: ", userPhone.phone)
        continue;
      } else {
        let smsDestinationPhoneNumber = '+1' + userPhone.phone;
        console.log("sms destination: ", smsDestinationPhoneNumber)

        // Download the helper library from https://www.twilio.com/docs/node/install
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure

        var message = await client.messages
          .create({
            body: 'EMERGENCY! Go to your rendezvous point: https://example.com?u=' + body.phone,
            from: '+18596482423',
            to: smsDestinationPhoneNumber
          })
        // .then(message => console.log(message.sid));

        console.log("message = ", JSON.stringify(message))
        console.log("message sid = ", message.sid)
      }
    }



    res.status(200).json({
      phone: body.phone,
      rendezvous: {
        lat: body.rendezvous.lat,
        lng: body.rendezvous.lng
      },
      notified: userPhones
    })
  }
}
