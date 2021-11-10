for (let i =  0; i< 1000000; i++) {
    db.insertOne(
        {
            "i": i,
            "username": "user_"+i,
            age: Math.floor(Math.random()*100),
            created: new Date()
        }
    )
}

