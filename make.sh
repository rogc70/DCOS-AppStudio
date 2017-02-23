#!/bin/bash

export DOCKERHUB_USER=digitalemil
export DOCKERHUB_REPO=mypublicrepo
export DOCKERHUB_PASSWD=uHBy8yMg7vxf
export VERSION=1.0.0

cp -r versions/$VERSION/* .
echo copy done
docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASSWD
echo login done
if [[ $VERSION == 1.0.0 ]] 
then
	cp Dockerfile CreatorApp
	cd CreatorApp
	docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-creator-v$VERSION .
	docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-creator-v$VERSION 
	cd ..
fi

if [[ $VERSION == 2.0.0 ]] 
then
	cp Dockerfile WorkerElasticApp
	cd WorkerElasticApp
	docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-elasticingester-v$VERSION .
	docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-elasticingester-v$VERSION
	cd ..
fi

cp Dockerfile WorkerCassandraApp
cd WorkerCassandraApp
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-cassandraingester-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-cassandraingester-v$VERSION 
cd ..

cp Dockerfile WorkerKafkaApp
cd WorkerKafkaApp
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-kafkaingester-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-kafkaingester-v$VERSION 
cd ..

cp Dockerfile MessageTransformerApp
cd MessageTransformerApp
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-messagetransformer-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-messagetransformer-v$VERSION 
cd ..

cp Dockerfile MessageValidatorApp
cd MessageValidatorApp
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-messagevalidator-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-messagevalidator-v$VERSION 
cd ..

cp Dockerfile WorkerListenerApp
cd WorkerListenerApp
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-messagelistener-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-messagelistener-v$VERSION 
cd ..

cp Dockerfile UI		
cd UI
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-ui-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-ui-v$VERSION 
cd ..

cp Dockerfile WorkerLoadGeneratorApp
cd WorkerLoadGeneratorApp
docker build -t $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-loader-v$VERSION .
docker push $DOCKERHUB_USER/$DOCKERHUB_REPO:dcosappstudio-loader-v$VERSION 
cd ..
