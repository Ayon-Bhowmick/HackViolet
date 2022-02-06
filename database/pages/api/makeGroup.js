import { makeGroup } from "../../lib/redis";

export default async function handler(req, res) {
    await makeGroup(req.body.distance);
    console.log("Group made");
    res.status(200).json({
        status: "success",
    });
}