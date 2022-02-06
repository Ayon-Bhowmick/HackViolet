import { save } from "../../lib/redis";

export default async function handler(req, res) {
    let { device, name, distance, battery, number } = req.body;
    distance = Math.round(distance * 364000);
    await save(device, name, distance, battery, number);
    console.log("added person");
    res.status(200).json({
        status: "success",
    });
}