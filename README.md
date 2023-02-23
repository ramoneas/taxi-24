<h1 align="center"> Startup Taxi24 </h1>
<p align="center"><img src="https://user-images.githubusercontent.com/61937309/220811048-3a1d96ed-acd8-48d6-85a0-9ed67c63ec63.png"><p>

## Descripcion del Proyecto
**Somos una nueva startup que desea revolucionar la industria del transporte proporcionando una solucion marca blanca.
Nuestro codigo es Open Source, dale un vistaso.**

## :construction: Herramientas utilizadas
- **Utilizamos el framework: <a href= "https://docs.nestjs.com">NestJS</a>**
- **Nuestra base de datos se encuentra en la nube de  <a href="https://supabase.com/">SupaBase con PostgresSQL</a>**
- **Para la manipulacion de datos utilizamos <a href="https://typeorm.io/">TypeOrm</a>**
- **Para el calculo de la distancia entre cliente - conductor utilizamos el package <a href="https://www.npmjs.com/package/s-haversine">s-haversine</a>**
- **De igual forma para calcular valores utilizamos <a href="https://www.npmjs.com/package/decimal.js?activeTab=readme">DecimalJs</a>**

## :hammer:Resumen de funcionalidades del proyecto
- **`Funcionalidad`: Poder obtener los conductores mas cercanos a unas coordenadas.**
- **`Funcionalidad`: Poder obtener los conductores mas cercanos a un cliente.**
- **`Funcionalidad`: Poder generar facturas al momento de terminar cada viaje.**

## 📁 Acceso al proyecto
**Para acceder al proyecto se debe de clonar dicho proyecto en este mismo repositorio.**
```bash
git clone https://github.com/RamonAlvarez1/taxi-24.git
```
**Si dicho comando no funciona probar con las otras opciones en el inciso de `<>Code`.**


## 🛠️ Abre y ejecuta el proyecto

- **Luego de clonado, es necesario acceder a la carpeta `api` de nuestro proyecto, podemos acceder a este con este comando.**
```bash
cd api
```

- **Al momento de estar dentro de la carpeta api, ya podemos iniciar nuestro proyecto. Pero antes necesitamos descargar las dependencias.**
**Descargamos las dependencias del proyecto con el comando:**
```bash
npm install
```

- **Ya con las dependencias descargadas, podemos correr nuestro servidor o API con el comando:**
```bash
npm run start:dev
```
## Modelos de datos
### **Drivers**
```bash
  id: string
  firstName: string
  lastName: string
  rating: number
  coordinates: string
  carModel: string
  carColor: string
  carPlates: string
  active: boolean
```
### **Passengers**
```bash
    id: string
    firstName: string
    lastName: string
    rating: number
    coordinates: string
```
### **Trips**
```bash
  id: string
  driver: Driver
  passenger: Passenger
  status: Enum
  createdAt: Date
  updatedAt: Date
```
### **Invoices**
```bash
    id: string
    driver: Driver
    passenger: Passenger
    price: number
    createdAt: Date
```


**La estructura y arquitectura del proyecto fue modelada debido recomienda en la documentacion y utilizando los comandos del <a href="https://docs.nestjs.com/cli/usages">CLI de NestJS</a>**

## Sentencias SQL

```bash
CREATE TABLE postgres;
```

### **Drivers**
```bash
CREATE TABLE driver (
			id SERIAL PRIMARY KEY,
			firstName VARCHAR(20),
			lastName VARCHAR(20),
			rating NUMERIC,
			coordinates VARCHAR(20),
			carModel VARCHAR(20),
			carColor VARCHAR(20),
			carPlates VARCHAR(20) UNIQUE,
			active BOOLEAN
);
```
### **Passengers**
```bash
CREATE TABLE passenger (
			id SERIAL PRIMARY KEY,
			firstName VARCHAR(20),
			lastName VARCHAR(20),
			rating NUMERIC,
			coordinates VARCHAR(20),
);
```
### **Trips**
```bash
CREATE TABLE trip (
			id SERIAL PRIMARY KEY,
			driver int FOREIGN KEY REFERENCES driver(id),
			passenger int FOREIGN KEY REFERENCES passenger(id),
			status VARCHAR(10),
			createdAt DATETIME,
			updatedAt DATETIME,
);
```
### **Invoices**
```bash
CREATE TABLE invoice (
			id SERIAL PRIMARY KEY,
			driver int FOREIGN KEY REFERENCES driver(id),
			passenger int FOREIGN KEY REFERENCES passenger(id),
			price NUMERIC,
			createdAt DATETIME,
);

```
## Testeo de algunos endpoints (Gifs)
### Passenger (findOne, findAll)
![Recording 2023-02-23 at 00 52 17](https://user-images.githubusercontent.com/61937309/220823920-b3eeb2da-9551-4cb3-a21b-230365de81a9.gif)

### Passenger (findDriversNearby)
![driversNearby](https://user-images.githubusercontent.com/61937309/220824224-0cfcadc2-415e-46ee-a0a6-07598b272fd4.gif)

### Driver (findDriversNearby)
![Recording 2023-02-23 at 00 57 27](https://user-images.githubusercontent.com/61937309/220824505-fbe3b99b-e141-4559-a6d2-1fdb1e36ad16.gif)

### Dbeaver (Datos)
![Recording 2023-02-23 at 01 02 05](https://user-images.githubusercontent.com/61937309/220824966-011e2b5f-7152-45f0-bbe0-5b9e46a24f7b.gif)

## Postman Collection
**En el proyecto existe un archivo con todos los endpoints que competen a este proyecto, una vez el servidor este puesto en marcha podra hacer uso de cada uno de estos REQUESTS del API Taxi24 utilizando el software <a href="https://www.postman.com/">Postman</a>, el nombre dicho archivo es el siguiente:**
```bash
TAXI 24.postman_collection.json
```

## Licencia
**Copyright (c) 2023 <a href="https://github.com/RamonAlvarez1">Ramón Alvarez</a>**

**This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.**
