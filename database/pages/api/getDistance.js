import { getDistance } from "../../lib/redis";

export default async function handler(req, res) {
    let data = await getDistance();
    res.status(200).json(data);
}