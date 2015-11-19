#!/bin/bash

tar -xvzf packaging/kafka/kafka_2.10-0.8.2.0.tgz -C packaging/kafka
mkdir logs
psql -f scripts/create_database.sql
