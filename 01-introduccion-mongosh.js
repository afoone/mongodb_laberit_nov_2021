db.coleccion.insertOne(
    {
        nombre: "Alfonso",
        apellidos: "Tienda"
    }
)


db.coleccion.find().pretty()
[
  {
    _id: ObjectId("61827447b934c679a0af53f2"),
    nombre: 'Alfonso',
    apellidos: 'Tienda'
  }
]


db.coleccion.insertOne(
    {
        nombre: "Luisa",
        apellidos : "Lane"
    }
)

db.coleccion.updateOne(
    {
        nombre: "Luisa"
    },
    {
        $set: {
            edad: 34
        }
    }
)

db.coleccion.deleteOne(
     {
     edad: 34
     }
)


    { acknowledged: true, deletedCount: 1 }


db.users.insertOne(
    {
        _id: 1,
        nombre: "Alfonso"
    }
)