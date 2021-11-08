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
    {sexo: "F"},
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
        diagnosticos.push(listadoDiagnosticos[Math.floor(Math.random()*listadoDiagnosticos.length)])
        return {
            ...patient,
            diagnosticos: diagnosticos
        }
    }
)