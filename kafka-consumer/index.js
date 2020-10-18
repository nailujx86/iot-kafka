const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'apptest',
    brokers: ['kafka1:19091', 'kafka2:19092', 'kafka3:19093']
});

const consumer = kafka.consumer({ groupId: 'consumergroup' })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const run = async () => {
    await consumer.connect()

    await consumer.subscribe({ topic: 'comms.event.0', fromBeginning: true })
    await consumer.subscribe({ topic: 'comms.status.0', fromBeginning: true })
    await consumer.subscribe({ topic: 'data.weather.0', fromBeginning: true })
    await consumer.subscribe({ topic: 'data.dust.0', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            switch (topic) {
                case 'comms.status.0': {
                    const obj = JSON.parse(message.value);
                    console.log(`[${obj.event}]\t\t${obj.device.substr(0, 8)}@${message.timestamp}: ${obj.purpose}`);
                    break;
                }
                case 'data.weather.0':
                case 'data.dust.0': {
                    const obj = JSON.parse(message.value);
                    const channel = topic.split('.')[1];
                    console.log(`[DATA:${channel}]\t${obj.device.substr(0, 8)}@${message.timestamp}: ${obj.sensor}; ${obj.data}`);
                }
            }
        }
    })
}

run().catch(console.error);