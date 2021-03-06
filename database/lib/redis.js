import { Client } from "redis-om";


const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        try {
            await client.open(process.env.REDIS_URL);
            console.log("Connected to Redis.");
        } catch (err) {
            console.error("Could not connect to Redis", err);
        }
    }
}

export async function save(device, name, distance, battery, number) {
    await connect();
    const data = {
        name: name,
        distance: distance,
        battery: battery,
        number: number,
    }
    await client.execute(["SET", device, JSON.stringify(data)]);
}

export async function getEveryone(device) {
    await connect();
    let data = [];
    const keys = await client.execute(["KEYS", "*"]);
    for (let x = 0; x < keys.length; x++) {
        if (keys[x] != device && keys[x] != "group") {
            let temp = await client.execute(["GET", keys[x]]);
            data.push(JSON.parse(temp));
        }
    }
    return data;
}

export async function makeGroup(distance, location) {
    await connect();
    const data = {
        distance: distance,
        location: location,
    }
    await client.execute(["SET", "group", JSON.stringify(data)]);
}

export async function getGroup() {
    await connect();
    let data = await client.execute(["GET", "group"]);
    return data;
}

export async function getPhoneNumbers() {
    await connect();
    let data = [];
    const keys = await client.execute(["KEYS", "*"]);
    for (let x = 0; x < keys.length; x++) {
        if (keys[x] != "group") {
            let temp = await client.execute(["GET", keys[x]]);
            data.push(JSON.parse(temp).number);
        }
    }
    return data;
}

export async function getDistance() {
    await connect();
    const temp = await client.execute(["GET", "group"]);
    return JSON.parse(temp).distance;
}

export async function getLocation() {
    await connect();
    const temp = await client.execute(["GET", "group"]);
    return JSON.parse(temp).location;
}

export async function getName(device) {
    await connect();
    let data = await client.execute(["GET", device]);
    return JSON.parse(data).name;
}

export async function getNumber(device) {
    await connect();
    const temp = await client.execute(["GET", device]);
    return JSON.parse(temp).number;
}

export async function wipe() {
    await connect();
    await client.execute(["FlUSHALL"]);
}