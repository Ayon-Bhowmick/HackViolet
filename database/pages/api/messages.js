import twilio from 'twilio';
import { getPhoneNumbers } from '../../lib/redis';

export default function sendMessage(req, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
    const arr = getPhoneNumbers()
    .then(data => {
  for (let i = 0; i < data.length; i++) {
      console.log(arr[i]);
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: data[i],
        body: req.body.body
      })
      .then(() => {
        console.log('Message sent');
      })
      .catch(err => {
        console.log(err);
      });
  }
});
    res.status(200).json({succuss : true});
}