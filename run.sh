#!/bin/bash
cd backend
echo "service mosquitto stop"
sudo service mosquitto stop &
sleep 5
echo "Instalando librerias necesarias para nodejs"
npm install &
sleep 5
echo "Cerrando contenedores que esten corriendo"
docker-compose down &
sleep 5
echo "Levantando conenedores"
docker-compose up &
sleep 15
cd ../fronted/iot-system
echo "Instalando librerias necesarias para vue.js"
npm install
echo "Levantando aplicacion vue"
npm run serve