import { getLocation } from "../../lib/redis";

export default async function handler(req, res) {
    let data = await getLocation();
    res.status(200).json(data);
}