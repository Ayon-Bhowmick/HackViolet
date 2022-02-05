import { getEveryone } from "../../lib/redis";

export default async function handler(req, res) {
    const { device } = req.body;
    const data = await getEveryone(device);
    res.status(200).json(data);
}