#!/bin/bash

cd ../..;

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P );

ngrok http 8000 > /dev/null &

sleep 4.0;

echo $parent_path;

curl -s localhost:4040/api/tunnels > $parent_path/frontend/constants/httpUrl.json;

echo $(curl -s localhost:4040/api/tunnels);

