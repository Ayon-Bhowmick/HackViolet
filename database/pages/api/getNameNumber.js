import { getNameNumber } from "../../lib/redis";

export default async function handler(req, res) {
    const data = await getNameNumber(req.body.device);
    res.status(200).json(data);
}