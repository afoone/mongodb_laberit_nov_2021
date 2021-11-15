// Son de tamaño fijo

// Creación
db.createCollection(
    "capped",
    {
        capped: true,
        size: 10000,
        max: 3 // opcional, el número máximo de elementos
    }
)

db.capped.insertOne({
    now: new Date()
    })