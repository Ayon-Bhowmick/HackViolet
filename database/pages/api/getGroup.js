import { getGroup } from "../../lib/redis";

export default async function (req, res) {
    let data = await getGroup();
    res.status(200).json(data);
}