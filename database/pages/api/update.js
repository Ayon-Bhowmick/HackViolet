import { save } from "../../lib/redis";

export default async function handler(req, res) {
    const { device, name, distance, battery, number } = req.body;
    await save(device, name, distance, battery, number);
    res.status(200).json({
        status: "success",
    });
}