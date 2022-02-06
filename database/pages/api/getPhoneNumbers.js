import { getPhoneNumbers } from "../../lib/redis";

export default async function (req, res) {
    let data = await getPhoneNumbers();
    res.status(200).json(data);
}