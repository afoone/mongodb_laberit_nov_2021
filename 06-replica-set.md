# Replica Sets

En linux: 
```shell
mkdir -p ./data/rs{1,2,3}
```

```shell
mkdir ./data/rs1 ./data/rs2 ./data/rs3
```

Posteriormente hay que leventar las réplicas en cada uno de los dbpath:

```shell
mongod --replSet rsAlfonso --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb_laberit_nov_2021/data/rs1 --port 27017  --oplogSize 200


mongod --replSet rsAlfonso --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb_laberit_nov_2021/data/rs2 --port 27018  --oplogSize 200


mongod --replSet rsAlfonso --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb_laberit_nov_2021/data/rs3 --port 27019  --oplogSize 200
```

Hay que meterse en el mongoshell y crear la réplica:

```javascript

let rsconf = {
    _id: "afoone",
    members: [
        {
            _id: 0,
            host: 'localhost:27017'
        },
        {
            _id: 1,
            host: 'localhost:27018'
        },
        {
            _id: 2,
            host: 'localhost:27019'
        }
    ]
}

rsconf.initiate(rsconf)

```
// nos tenemos que conectar al primary

for (i = 0; i <= 1000; i++) {
    db.coll.insertOne(
        {
            count: i
        }
    )
}