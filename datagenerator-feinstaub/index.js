const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');
const purpose = "dust";
const uuid = uuidv4();
const random = require('random');
console.log("Producer started, UUID: " + uuid);

const kafka = new Kafka({
    clientId: purpose + '-' + uuid,
    brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
})

const producer = kafka.producer();
const admin = kafka.admin();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
    await producer.connect();

    const current_temp = random.normal(21, 0.04);
    const current_pm25 = random.normal(80, 10);
    const current_pm100 = random.normal(100, 10);

    await sleep(random.int(1000,10000)); // initial nap :)
    while (true) {
        await producer.send({
            topic: 'comms.status.0',
            messages: [
                {value: JSON.stringify({event: 'JOIN', device: uuid, purpose: purpose})}
            ]
        });
        
        await producer.send({
            topic: 'data.dust.0',
            messages: [
                {value: JSON.stringify({device: uuid, sensor: 'temp', data: current_temp()})},
                {value: JSON.stringify({device: uuid, sensor: 'pm2.5', data: current_pm25()})},
                {value: JSON.stringify({device: uuid, sensor: 'pm10', data: current_pm100()})}
            ]
        })
        await producer.send({
            topic: 'comms.status.0',
            messages: [
                {value: JSON.stringify({event: 'LEAVE', device: uuid, purpose: purpose})}
            ]
        })
        const wait = random.int(10000, 25000);
        await sleep(wait);
    }

    
}

run().catch(console.error);