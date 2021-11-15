# Sharding

Sharding (fragmentación) es el proceso de separar datos entre máquinas. El término particionar es a menudo usado para describir este concepto. Colocar un subconjunto de datos en cada máquina hace posible el almacenar más datos y manejar más carga sin requerir máquinas más grandes y potentes, sólo una cantidad mayor de máquinas menos potentes. La fragmentación puede ser usada asimismo con otros propósitos, incluyendo el colocar los datos más frecuentemente usados en un hardware de mayor rendimiento o separar un datas3et basado en la geografía para localizar un subconjunto de documentos en una colección.

En cualquier base de datos se puede utilizar la fragmentación de datos, pero es la aplicación la que debe gestionar estos subconjuntos. MongoDB soporta autosharding. 

Sharding es la forma más compleja de configurar MongoDB, tando desde un punto de vista de desarrollo como de operaciones. Se ha de tener experiencia en servidores standalone y en replica sets antes de intentar instalar o usar un cluster fragmentado.

## Componentes de un cluster

La fragmentación permite crear un cluster de muchas máquinas (shards o fragmentos) y dividir una colección entre ellos, poniendo un subconjunto de datos en cada fragmento. 

Uno de los objetivos del sharding es hacer que un cluster de 2, 3, 10 o incluso cientos de fragmentos se comporte como una máquina única para las aplicaciones. Para ocultar esos detalles de la aplicación, ejecutamos uno o más procesos de enrutamiento llamados *mongos* delante de los fragmentos. Un *mongos* mantiene una *tabla de contenidos* que indica que framento contiene qué datos. 

El router, sabiendo que datos es en cada fragmento, es capaz de reenviar las peticiones a los fragmentos apropiados. Si hay respuestas a una petición el enrutador los recoge y, si es necesario los mergea y los envía a la aplicación. Hasta donde conoce la aplicación, se está conectando a un mongod único. 

## Servidores de configuración

Los *config servers* son el cerebro de tu cluster. Mantienen todos los metadatos sobre qué servidores tienen que datos. Asi que estos tienen que ser configurados los primeros y los datos que mantienen son extremadamente importantes. Cada config server debería estar en una máquina diferente, preferiblemente distribuida geográficamente. 

Los *config servers* deben ser iniciados antes que cualquier proceso *mongos*, ya que *mongos* recupera la configuración de ellos. 

Creemos primero los archivos para estos datos:

```shell
mkdir -p ./storage-shards/config{1,2,3}
```

Para iniciar los tres procesos de la réplica:

``shell
mongod --configsvr --replSet configRS --bind_ip 127.0.0.1  --dbpath /Users/atienda/desarrollo/cursos/mongodb/storage-shards/config1 --port 27001

mongod --configsvr --replSet configRS --bind_ip 127.0.0.1  --dbpath /Users/atienda/desarrollo/cursos/mongodb/storage-shards/config2 --port 27002

mongod --configsvr --replSet configRS --bind_ip 127.0.0.1  --dbpath /Users/atienda/desarrollo/cursos/mongodb/storage-shards/config3 --port 27003
```

Luego, una vez iniciados los procesos habrá que conectarse a uno de ellos:

```shell
mongosh --host 127.0.0.1 --port 27001
````

Y usamos el `rs.initiate()`: 

```javascript
rs.initiate(
    {
        _id: 'configRS', 
        configsvr: true,
        members: [
            {
                _id: 0,
                host: '127.0.0.1:27001'
            },
            {
                _id: 1,
                host: '127.0.0.1:27002'
            },
            {
                _id: 2,
                host: '127.0.0.1:27003'
            }
        ]
    }
)
```

Usando sólo un shard:

```javascript
rs.initiate(
    {
        _id: 'configRS', 
        configsvr: true,
        members: [
            {
                _id: 0,
                host: 'localhost:27001'
            }
        ]
    }
)
```


## Procesos mongos

Una vez ejecutados los procesos de configuración ejecutaremos los procesos *mongos*, que ejercen de enrutadores. Tienen que saber dónde están los *config servers* así que los arrancamos con la opción --configdb:

```bash
mongos --configdb configRS/127.0.0.1:27001,configRS/127.0.0.1:27002,configRS/127.0.0.1:27003 \
  --bind_ip 127.0.0.1 --logpath /Users/atienda/desarrollo/cursos/mongodb/logs/mongos.log --port 27101
```

Con un sólo config server, sin replica set:

```bash
mongos --configdb configRS/localhost:27001 \
  --bind_ip 127.0.0.1 --logpath /Users/atienda/desarrollo/cursos/mongodb/logs/mongos.log --port 27101
```

Fijémonos que no requiere directorio de datos, no guarda datos, lo hace en los config servers

## Arrancar un replicaset

Ver el estado:

```javascript
rs.status()
````

La réplica que tenemos era la anterior:

```shell
mongod --replSet afoone --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb/data/rs1 --port 27017  --oplogSize 200
mongod --replSet afoone --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb/data/rs2 --port 27018  --oplogSize 200
mongod --replSet afoone --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb/data/rs3 --port 27019  --oplogSize 200
```

Para convertir esta réplica en un sharding, hay que levantarlas con --shardsvr, para actualizarla hay que parar primero los servidores SECONDARY y luego los PRIMARY






