#!/bin/bash
set -e

# -------------------------------
# Script para importar un CSV a MongoDB en Docker
# Compatible con Linux, macOS y Windows (Git Bash / PowerShell / CMD)
# Uso: ./importar.sh archivo.csv basedatos coleccion
# Ejemplo: ./importar.sh Walmart_Sales.csv walmartDB sales
# -------------------------------

# Verificar que se pasaron 3 parámetros
if [ "$#" -ne 3 ]; then
  echo "Uso: $0 archivo.csv basedatos coleccion"
  exit 1
fi

ARCHIVO=$1
BASEDATOS=$2
COLECCION=$3

CONTENEDOR="mongodb"
USUARIO="root"
PASSWORD="example"

# Normalizar ruta para Windows (Git Bash convierte C:\ en /c/)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" || "$OSTYPE" == "cygwin" ]]; then
  ARCHIVO_PATH=$(cygpath -u "$(pwd)/data/import/$ARCHIVO")
else
  ARCHIVO_PATH="./data/import/$ARCHIVO"
fi

# Verificar que el archivo existe en host
if [ ! -f "$ARCHIVO_PATH" ]; then
  echo "No se encontró el archivo en $ARCHIVO_PATH"
  exit 1
fi

# Copiar archivo al contenedor (por si el volumen no funciona)
docker cp "$ARCHIVO_PATH" $CONTENEDOR:/data/import/$ARCHIVO

# Ejecutar importación dentro del contenedor (sin -it para evitar errores en Windows)
docker exec $CONTENEDOR bash -c "
  mongoimport \
    --type csv \
    --db $BASEDATOS \
    --collection $COLECCION \
    --headerline \
    --drop \
    /data/import/$ARCHIVO \
    -u $USUARIO -p $PASSWORD --authenticationDatabase admin
"


echo "Archivo $ARCHIVO importado en DB '$BASEDATOS', colección '$COLECCION'."

# -------------------------------
# Verificación automática
# -------------------------------
echo "Mostrando total de documentos y 5 ejemplos:"
docker exec -it $CONTENEDOR mongosh -u $USUARIO -p $PASSWORD --authenticationDatabase admin --quiet --eval "
db = db.getSiblingDB('$BASEDATOS');
print('Total de documentos: ' + db.$COLECCION.countDocuments());
print('--- Primeros 5 documentos ---');
db.$COLECCION.find().limit(5).forEach(doc => printjson(doc));
"