# node-ts-console-app
Basic node NOC App with  TypeScript, clean architecture and test


Instrucciones para correr la aplicación

# dev
1. Crear archivo .env con base en .env.template
2. Configurar las variables de entorno
3. Reconstruir los modulos ```npm instal```
4. Levantar las bases de datos con el comando ```docker-compose up -d```
5. Para el manejo de distintos enviroments y sus variables de entorno instalar
```
npm install -g dotenv-cli
```
6. Generar las migraciones de prisma con el comando
    ```
    npx prisma generate dev
    ```
7. Generar migraciones de prisma de acuerdo al entorno
```
dotenv -e .env.enviroment -- npx prisma migrate dev
```
8. Ejecutar ```npm run dev```
9. Para realizar el test local despues de configuración del entorno ejecutar
```
npm run test:watch
```
