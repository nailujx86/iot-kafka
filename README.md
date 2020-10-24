# iot-kafka
## Description
This repository serves as an example on how a Kafka-Environment could be implemented on a network of docker containers.
## Architecture
### Docker
The underlying Infrastructure in this repository is using Docker, a software that helps developing and deploying software as self-sufficient and idependent containers.
### Kafka
Apache Kafka is a event-streaming system developed to be able to handle large loads and dataflows.
### Node.js
Node.js is a platform-independent Javascript Runtime Environment that allows Javascript to run outside of the browser.
## Requirements
- Docker
- Docker-Compose Version >= 3.2

## How to use
1. Pull this git-Repository
2. Adjust the replicas for the services `staubdata` and `wetterdata` in docker-compose.yml if needed
3. Run: `docker-compose run kafka-init`  
This initializes four Topics with a replication factor of 2 accross the three brokers.
4. Run: `docker-compose up wetterdata staubdata consumer`
This command starts up multiple containers containing producers simulating ppm dust sensors weather sensors. Additionally to that it starts up one consumer implementing kafkas consumer API and listening for data from the 'sensors'
4. Watch how the datagenerators send simulated iot data that the consumer container then picks up!

You can inspect the stored data of the Kafka Brokers in the `./data` subdirectory.