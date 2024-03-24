#!/bin/bash
# Copyright Epic Games, Inc. All Rights Reserved.

# Start docker container by name using host networking
docker push 192.168.2.100:5000/cirrus-webserver:latest

# Interactive start example
#docker run --name cirrus_latest --network host --rm -it --entrypoint /bin/bash cirrus-webserver
