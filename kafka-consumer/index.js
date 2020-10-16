const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'apptest',
    brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
});

const consumer = kafka.consumer({ groupId: 'test-group' })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
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