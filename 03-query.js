let service = ['OBSTETRICIA', 'URGENCIAS', 'NEONATOLOGÍA', 'PEDIATRÍA', 'ONCOLOGÍA']

for (let i = 0; i < 100; i++) {
    db.patients.insertOne(
        {
            name: 'patient' + i,
            age: Math.floor(
                Math.random() * 100
            ),
            service: service[Math.floor(Math.random() * service.length)]
        }
    )
}

db.patients.find(
    {
        name: 'patient34'
    }
)

db.patients.updateMany(
    // Query
    {}
    ,
    // modificaciones
    {
        $set: {
            sexo: Math.random() <= 0.5 ? "F" : "M"
        }
    }
)

let patients = db.patients.find().toArray()

patients.forEach(element => {
    db.patients.updateOne(
        {
            _id: element._id
        },
        {
            $set: {
                sexo: Math.random() <= 0.5 ? "F" : "M"
            }
        }
    )
});

db.patients.find(
    {},
    {
        _id: 0,
        name: 1,
        sexo: 1
    }
)

db.patients.find(
    { sexo: "F" },
    {
        _id: 0,
        name: 1,
    }
)

db.patients.find(
    {
        age: 34
    },
    {
        _id: 0,
        name: 1,
        sexo: 1,
        age: 1
    }
)

db.patients.find(
    {
        age: {
            $lte: 34
        }
    },
    {
        _id: 0,
        name: 1,
        sexo: 1,
        age: 1
    }
)

patients = db.patients.find().toArray()

let listadoDiagnosticos = ['DIABETES MELITUS', 'LUPUS', 'VASCULITIS', 'COVID19', 'CATARRO']

patients = patients.map(
    patient => {
        let diagnosticos = []
        diagnosticos.push(listadoDiagnosticos[Math.floor(Math.random() * listadoDiagnosticos.length)])
        return {
            ...patient,
            diagnosticos: diagnosticos
        }
    }
)

db.patients.insertMany(patients)

db.patients.find(
    {
        sexo: 'F',
        age: {
            $lte: 34,
            $gte: 20
        }
    },
    {
        _id: 0,
        name: 1,
        age: 1,
        service: 1,
        sexo: 1
    }
)

db.patients.find(
    {
        service: {
            $in: ["OBSTETRICIA", "URGENCIAS"]
        }
    },
    {
        _id: 0,
        name: 1,
        age: 1,
        service: 1,
        sexo: 1
    }
)

db.patients.find(
    {
        service: {
            $nin: ["OBSTETRICIA", "URGENCIAS"]
        }
    },
    {
        _id: 0,
        name: 1,
        age: 1,
        service: 1,
        sexo: 1
    }
)

db.patients.find(
    {
        age: {
            $lte: 40,
            $gte: 20
        },
        $or: [
            {
                service: "URGENCIAS"
            },
            {
                sexo: "F"
            }
        ]
    },
    {
        _id: 0,
        name: 1,
        age: 1,
        service: 1,
        sexo: 1
    }
)

db.patients.find(
    {
        age: {
            $not: { $mod: [2, 1] }
        }
    }
)

db.patients.insertMany(
    [
        {
            name: "pepe",
            age: 56,
            sexo: "M"
        },
        {
            name: "juan",
            age: 56,
            sexo: "M"
        },
        {
            name: "maria",
            age: 56,
            sexo: "M"
        },
    ]
)

db.updateOne(
    {
        name: "patient14"
    },
    {
        $set: {
            service: null
        }
    }
)
db.patients.updateOne(
    {
        name: "patient14"
    },
    {
        $set: {
            service: null
        }
    }
)

db.patients.find(
    {
        service: null
    }
)

db.patients.find(
    {
        name: /1/
    }
)

db.patients.find(
    {
        name: {
            $regex: /Patient\w*1/i
        }
    }
)

db.colores.insertOne(
    {
        colores: [
            "rojo",
            "amarillo",
            "verde"
        ]
    }
)

db.colores.find(
    {
        colores: ["rojo", "amarillo"]
    }
)

db.colores.find(
    {
        colores: {
            $all: ["verde", "amarillo"]
        }
    }
)

db.colores.insertOne(
    {
        colores: [
            "violeta",
            "amarillo",
            "azul"
        ]
    }
)

db.colores.find(
    {
        'colores.2': 'amarillo'
    }
)

db.colores.insertOne(
    {
        colores: [
            "violeta",
            "amarillo",
            "azul",
            "añil"
        ]
    }
)

db.colores.find(
    {
        colores: {
            $size: 3
        }
    },
    {
        colores: 1,
        _id: 0
    }
)

db.colores.find(
    {
        colores: "amarillo"
    },
    {
        'colores.$': 1,
        _id: 0
    }
)

db.colores.updateOne({}, {
    $push: {
        colores: "amarillo"
    }
})

db.x.insertMany(
    [
        {
            x: 5
        },
        {
            x: 15
        },
        {
            x: 25
        },
        {
            x: [5, 25]
        }
    ]
)

db.x.find({
    x: {
        $gt: 10,
        $lt: 20
    }
}
)

db.x.find({
    x: {
       $elemMatch: {
        $gt: 10,
        $lt: 20
       }
    }
}
)

