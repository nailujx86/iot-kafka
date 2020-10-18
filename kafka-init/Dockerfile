FROM confluentinc/cp-kafka:5.3.0

ENV WAIT_VERSION 2.7.3
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD /wait && \
    kafka-topics --zookeeper zookeeper:2181 --create --topic comms.status.0 --partitions 1 --replication-factor 2 && \
    kafka-topics --zookeeper zookeeper:2181 --create --topic comms.event.0 --partitions 1 --replication-factor 2 && \
    kafka-topics --zookeeper zookeeper:2181 --create --topic data.weather.0 --partitions 1 --replication-factor 2 && \
    kafka-topics --zookeeper zookeeper:2181 --create --topic data.dust.0 --partitions 1 --replication-factor 2
