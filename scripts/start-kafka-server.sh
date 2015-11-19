#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

../packaging/kafka/kafka_2.10-0.8.2.0/bin/kafka-server-start.sh ../packaging/kafka/kafka_2.10-0.8.2.0/config/server.properties
