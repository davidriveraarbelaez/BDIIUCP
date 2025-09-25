# Guía: Importar CSV en MongoDB con Docker

Este material explica cómo levantar MongoDB con Docker, importar un archivo CSV a una base de datos y verificar los documentos automáticamente usando el script `importar.sh`.

## Requisitos previos

- Tener **Docker** instalado y corriendo.
- Tener **Docker Compose** instalado.
- Clonar este repositorio o trabajar en la carpeta del curso:


## 📂 Estructura de carpetas

BDIIUCP/
├── MongoDB/
│ ├── data/
│ │ ├── db/ # Persistencia de MongoDB
│ │ ├── import/ # Archivos CSV a importar
│ │ │ └── Walmart_Sales.csv
│ ├── docker-compose.yml # Define servicios MongoDB + Mongo Express
│ ├── importar.sh # Script de importación automática
│ └── README.md # Esta guía

## Paso 1: Levantar MongoDB y Mongo Express

Entrar a la carpeta `MongoDB/` y ejecutar:

```bash
docker-compose up -d
```

- MongoDB se abrirá en: mongodb://localhost:27017
- Mongo Express estará en: http://localhost:8081
    - Usuario: root
    - Password: example

## Paso 2: Preparar el archivo CSV

Colocar el archivo que quiera importar en la carpeta:

```bash
BDIIUCP/MongoDB/data/import/
```

Descargar el archivo Walmart_Sales.csv desde [Kaggle](https://www.kaggle.com/datasets/mikhail1681/walmart-sales) y colocarlo en la carpeta creada.

## Paso 3: Dar permisos de ejecución al script (solo la primera vez)

```bash
chmod +x BDIIUCP/MongoDB/importar.sh
```
    
## Paso 4: Ejecutar el script de importación

Ejecutar el script indicando:

- Nombre del archivo CSV
- Nombre de la base de datos
- Nombre de la colección

```bash
BDIIUCP/MongoDB/importar.sh Walmart_Sales.csv walmartDB sales
```

## Paso 5: Verificar los datos

El script automáticamente:

1. Copiar el CSV al contenedor.
2. Ejecutar mongoimport.
3. Mostrar cuántos documentos se insertaron.
4. Listar 5 documentos de ejemplo.

**Ejemplo de salida:**

``` 
6435 document(s) imported successfully. 0 document(s) failed to import.
Archivo Walmart_Sales.csv importado en DB 'walmartDB', colección 'sales'.
Mostrando total de documentos y 5 ejemplos:
Total de documentos: 6435
--- Primeros 5 documentos ---
{
  "_id": ObjectId("..."),
  "Invoice_ID": "750-67-8428",
  "Branch": "A",
  "City": "Yangon",
  ...
}
```

## Paso 6 opción A: Acceder a Mongo Express
Abrir [http://localhost:8081](http://localhost:8081) en el navegador para explorar la base de datos y colección importada.

- Usuario: root
- Contraseña: example

Allí encontrará la base de datos (walmartDB) y la colección (sales) con todos los documentos cargados.

## Paso 6 opción B: Ver las bases de datos desde Bash
    
1. Ejecutar este comando desde la terminal (no dentro de mongosh, sino en bash):

```bash
docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin --quiet --eval "show dbs"
```

2. Para usar la base de datos importada:

```bash
docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin --quiet --eval "use walmartDB; show collections;"
```

3. Si desea ver los primeros 5 documentos de la colección `sales`:

```bash
docker exec -it mongodb mongosh -u root -p example --authenticationDatabase admin --quiet --eval "use walmartDB; db.sales.find().limit(5).forEach(doc => printjson(doc));"
```


## Paso 7: Detener los contenedores

Cuando termine, puede detener el entorno con:

```bash
docker-compose down
```
