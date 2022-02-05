import { save } from "../../lib/redis";

export default async function handler(req, res) {
    const { device, name, distance, battery } = req.body;
    await save(device, name, distance, battery);
    res.status(200).json({
        status: "success",
    });
}