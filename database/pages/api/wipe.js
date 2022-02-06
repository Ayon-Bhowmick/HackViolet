import { wipe } from "../../lib/redis";

export default async function handler(req, res) {
    await wipe();
    console.log("Wiped");
    res.status(200).json({
        status: "success",
    });
}