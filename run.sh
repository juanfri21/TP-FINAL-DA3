#!/bin/bash
cd backend
echo "service mosquitto stop"
service mosquitto stop &
sleep 5
echo "Cerrando contenedores que esten corriendo"
docker-compose down &
sleep 5
echo "Levantando conenedores"
docker-compose up

# cd ../fronted
# echo "Instalando librerias necesarias"
# npm install
# echo "Levantando aplicacion vue"
# npm run serve