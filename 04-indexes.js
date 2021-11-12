for (let i =  0; i< 1000000; i++) {
    db.users.insertOne(
        {
            "i": i,
            "username": "user_"+i,
            age: Math.floor(Math.random()*100),
            created: new Date()
        }
    )
}

db.users.find(
    {
        username: 'user_134'
    }
).explain('executionStats')

db.users.createIndex(
    {
        username: 1
    }
)

db.users.find().sort(
    {
        age: 1,
        username: 1
    }
)

db.users.createIndex(
    {
        age: 1,
        username: 1
    }
)

db.users.find().sort( { age: 1, username: 1 }).explain(
    'executionStats'
)

db.users.find().sort( {  username: 1 , age: 1}).explain(
    'executionStats'
)


db.users.getIndexes()

db.users.find(
    { 
        age: 34
    }
).explain('executionStats')

db.users.find(
    { 
        age: 34,
        username: {
            $regex: /user_12/
        }
    }
).explain('executionStats')


db.users.find(
    { 
        age: 34,
        username: {
            $regex: /^user_12/
        }
    }
).explain('executionStats')


db.users.dropIndex('username_1')

db.users.createIndex(
    {
        username: 1
    },
    {
        unique: true, 
        partialFilterExpression: {
            username: {
                $exists: true            }
        }
    }
)