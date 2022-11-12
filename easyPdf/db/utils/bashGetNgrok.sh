#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

ngrok http 8000

curl -n 3 127.0.0.1 > nul

curl -s localhost:4040/api/tunnels > parent_path/frontend/constants/httpUrl.json;