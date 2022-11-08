#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

ngrok http 8000

curl -s localhost:4040/api/tunnels > parent_path/frontend/constants/httpUrl.json;