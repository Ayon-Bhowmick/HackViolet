import { Client, Entity, Schema, Repository } from "redis-om";


const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        try {
            console.log("Connecting to Redis...");
            await client.open(process.env.REDIS_URL);
            console.log("Connected to Redis.");
        } catch (err) {
            console.error("Could not connect to Redis", err);
        }
    }
}

class Person extends Entity {}
let schema = new Schema(
    Person, {
        name: {type: "string"},
        distance: {type: "string"},
        battery: {type: "string"},
    },
    {
        dataStructure: "JSON",
    }
);

export async function save(device, name, distance, battery) {
    await connect();
    let data = {
        name: name,
        distance: distance,
        battery: battery,
    }
    await client.execute(["SET", device, JSON.stringify(data)]);
}

export async function getEveryone(device) {
    let data;
    const keys = await client.execute(["KEYS", "*"]);
    for (let key of keys) {
        if (key != device) {
            data.push(await client.execute(["GET", key]));
        }
    }
}