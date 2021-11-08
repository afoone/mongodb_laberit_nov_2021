let service = ['OBSTETRICIA', 'URGENCIAS', 'NEONATOLOGÍA', 'PEDIATRÍA', 'ONCOLOGÍA']

for (let i = 0; i<100; i++) {
    db.patients.insertOne(
        {
            name: 'patient'+i,
            age: Math.floor(
                Math.random() * 100
            ),
            service: service[Math.floor(Math.random()*service.length)]
        }
    )
}