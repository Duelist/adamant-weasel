#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

tar -xvzf ../packaging/kafka/kafka_2.10-0.8.2.0.tgz -C ../packaging/kafka
mkdir ../logs
psql -f ./create_database.sql
