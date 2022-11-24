start ngrok http 8000

curl -n 3 127.0.0.1 > nul

curl -s localhost:4040/api/tunnels  > %~dp0..\..\frontend\constants\httpUrl.json