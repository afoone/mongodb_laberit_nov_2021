for (let i = 0; i<100; i++) {
    db.patients.insertOne(
        {
            name: 'patient'+i,
            age: Math.floor(
                Math.random() * 100
            )
        }
    )
}