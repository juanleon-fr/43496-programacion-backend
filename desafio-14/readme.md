# Desafío 14


# Instrucciones para levantar el servidor

## NGINX (terminal en directorio del desafío 13)

·Ejecutar NGINX.exe

·Volver a cargar el servidor luego de haber hecho cambios en el archivo de configuración de nginx: ./nginx.exe -s reload

·Ver cuántos servers de Nginx están prendidos tasklist /fi "imagename eq nginx.exe"

·Matar un servidor según puerto: taskkill /F /PID >port<

## PM2 (terminal en carpeta "node")

·PM2 modo cluster: pm2 start server.js --name="cluster" --watch -i max -- 8080

·PM2 modo fork: pm2 start server.js --name="fork" --watch -- 8080
(cambiar puerto si se desea iniciar junto con otro servidor funcionando)

·Listar los servers: pm2 list

·Terminar ejecución: pm2 stop >id de worker<

·Terminar ejecución de todos los servers de PM2: pm2 stop all

·Eliminar los servers de pm2: pm2 delete all