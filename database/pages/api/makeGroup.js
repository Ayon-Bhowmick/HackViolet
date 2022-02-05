import { makeGroup } from "../../lib/redis";

export default async function handler(req, res) {
    const { distance } = req.body;
    await makeGroup(distance);
    res.status(200).json({
        status: "success",
    });
}