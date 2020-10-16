const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'apptest',
    brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
    await sleep(20000);
    await producer.connect();
    await producer.send({
        topic: 'Topic1',
        messages: [
            { value: 'TEST3q3442' }
        ]
    });

    await producer.disconnect();



    await consumer.connect()
    await consumer.subscribe({ topic: 'Topic1', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            })
        },
    })
}

run().catch(console.error);