#!/bin/bash


docker run  --name kafka -p 2181:2181 -p 9092:9092 --env ADVERTISED_HOST=0.0.0.0 --env ADVERTISED_PORT=9092 spotify/kafka &
sleep 5
KAFKAID=$(docker ps -q -f "name=kafka")
echo Kafka Container: $KAFKAID
docker run  --name kafkahandler --env KAFKA_SERVICE=127.0.0.1:2181 -p 3031:3031 digitalemil/mypublicrepo:dcosappstudio-kafkahandler-v1.0.0 &
sleep 5
KAFKAHANDLERID=$(docker ps -q -f "name=kafkahandler")
echo Kafkahandler Container: $KAFKAHANDLERID

HTTPSTATUSCODE=$(curl -XPOST -s -o /dev/null -w "%{http_code}" -d '{"id":123, "location":"0,0", "event_timestamp":"", "f1":"", "f2":"", "f3":"", "f4":""}' http://localhost:3031/data)

sleep 5
~/kafka_2.11-0.10.1.1/bin/kafka-topics.sh --list --zookeeper 127.0.0.1:2181 
~/kafka_2.11-0.10.1.1/bin/kafka-console-consumer.sh --zookeeper 127.0.0.1:2181  --topic kafkatest --from-beginning
sleep 5
docker kill $KAFKAHANDLERID
docker rm $KAFKAHANDLERID
docker kill $KAFKAID
docker rm $KAFKAID

if [ $HTTPSTATUSCODE -eq 200 ]
then
	echo Success.
        exit 0
else
	echo Failure: $HTTPSTATUSCODE
        exit $HTTPSTATUSCODE
fi

