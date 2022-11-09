start ngrok http 8000

curl -s localhost:4040/api/tunnels  > %~dp0..\..\frontend\constants\httpUrl.json