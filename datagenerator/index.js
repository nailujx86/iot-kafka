const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();
console.log("Producer started, UUID: " + uuid);

const kafka = new Kafka({
    clientId: 'device-' + (Math.floor(Math.random()*100)),
    brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
})

const producer = kafka.producer();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
    await sleep(10000);
    await producer.connect();
    for(var i = 0; i < 10; i++) {
        await producer.send({
            topic: 'Topic1',
            messages: [
                {value: uuid + ': ' + i}
            ]
        })
    }

    await producer.disconnect();
    console.log("my job is done...");
}

run().catch(console.error);