const { Kafka } = require('kafkajs');
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();
console.log("Producer started, UUID: " + uuid);

const kafka = new Kafka({
    clientId: 'device-' + uuid,
    brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
})

const producer = kafka.producer();
const admin = kafka.admin();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
    // await admin.createTopics({
    //     topics: [{
    //         topic: "Topic1",
    //         replicationFactor: 3
    //     }],
    //     waitForLeaders: true
    // }).catch();
    await sleep(10);
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