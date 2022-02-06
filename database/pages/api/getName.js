import { getName } from "../../lib/redis";

export default async function handler(req, res) {
    const data = await getName();
    res.status(200).json(data);
}