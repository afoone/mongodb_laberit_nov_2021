mkdir -p ./data/rs{1,2,3}

mkdir ./data/rs1 ./data/rs2 ./data/rs3

mongod --replSet rpname --bind_ip 127.0.0.1 --dbpath /Users/atienda/desarrollo/cursos/mongodb_laberit_nov_2021/storage/rs1 --port 27017  --oplogSize 200

