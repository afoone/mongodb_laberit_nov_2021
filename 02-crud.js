db.books.insertMany(
    [
        {
            _id: 1,
            title: "Siddartha",
            author: "Herman Hesse"
        },
        {
            _id: 2,
            title: "El lobo estepario",
            author: "Herman Hesse"
        },
        {
            _id: 3,
            title: "El hombre en busca de su sentido",
            author: "Victor Frankl"
        },
        {
            _id: 4,
            title: "El que sea",
            author: "yo"
        },
    ], {
    ordered: false
}
)

db.books.deleteOne(
    {
        _id: 2
    }
)

db.books.deleteMany(
    {
        author: 'Herman Hesse'
    }
)

db.books.findOne(
    {
        _id: 4
    }
)

db.books.replaceOne(
    {
        _id: 4
    },
    libro
)

db.movies.updateMany({},
    {
        $set: { year: 1984 }
    }
)

db.books.updateMany(
    {},
    {
        $set: {
            counter: 0
        }
    }
)

db.books.updateOne(
    {
        _id: 2
    },
    {
        $inc: {
            counter: 1
        }
    }
)

libros.map(
    libro => {
        return {
            _id: libro._id,
            title: libro.title,
            counter: libro.counter,
            isbn: libro.isbn,
            author: {
                nombre: libro.author.split(" ")[0],
                apellido: libro.author.split(" ")[1]
            }
        }
    }
)

// Código optimizado que crea el nuevo array de libros
libros = libros.map(
    libro => {
        return {
            libro,
            author: {
                nombre: libro.author.split(" ")[0],
                apellido: libro.author.split(" ")[1]
            }
        }
    }
)

libros.forEach(libro => {
    db.books.updateOne(
        {
            _id: libro._id
        },
        {
            $set: {
                author: libro.author
            }
        }
    )
});

db.books.updateOne(
    {
        "author.nombre": "yo"
    },
    {
        $set: {
            "author.nombre": "Alfonso"
        }
    }
)

db.books.updateOne(
    {
        _id: 2
    },
    {
        $inc: {
            counter: -1
        }
    }
)

db.books.updateOne(
    {
        _id: 1
    },
    {
        $set: {
            tags: ["budismo", "literatura", "nobel"]
        }
    }
)

db.books.updateOne(
    {
        _id: 1
    }, {
    $push: {
        tags: "nuevo tag"
    }
}
)

db.books.updateOne(
    {
        _id: 1
    }, {
    $push: {
        tags: {
            $each: ["tg1", "tg2", "tg3"]
        }
    }
}
)

db.books.updateOne(
    {
        _id: 1
    }, {
    $push: {
        tags: {
            $each: ["tgx", "tgy", "tgz"],
            $slice: 10
        }
    }
}
)


db.books.updateOne(
    {
        _id: 1
    }, {
    $push: {
        ratings: {
            $each: [
                {
                    user: "user1",
                    rating: 3
                },
                {
                    user: "user2",
                    rating: 1
                },
                {
                    user: "user3",
                    rating: 6
                },
                {
                    user: "user4",
                    rating: 7
                },
                {
                    user: "user5",
                    rating: 9
                },
                {
                    user: "user6",
                    rating: 6
                },
                {
                    user: "user7",
                    rating: 3
                },
            ],
            $slice: 10
        }
    }
}
)


db.books.updateOne(
    {
        _id: 1
    }, {
    $push: {
        ratings: {
            $each: [
                {
                    user: "user10",
                    rating: 5
                },
                {
                    user: "user11",
                    rating: 1
                },
                {
                    user: "user12",
                    rating: 6
                },
            ],
            $slice: 3,
            $sort: { "rating": -1 }
        }
    }
}
)

// sets
db.books.updateOne(
    {
        _id: 2
    }, {
    $addToSet: {
        tags: {
            $each: ["tg1", "tg2", "tg3"],
        }
    }
}
)

// remove elements pop
db.books.updateOne(
    {
        _id: 2
    }, {
    $pop: {
        tags: 1
    }
}
)

// remove elements pull
db.books.updateOne(
    {
        _id: 2
    }, {
    $pull: {
        tags: "tg3"
    }
}
)

for (let i = 0; i <= 10; i++) {
    db.books.updateOne(
        {
            _id: 2
        }, {
        $push: {
            tags: "tg" + i
        }
    }
    )
}

db.books.updateOne(
    {
        _id: 2
    },
    {
        $set: {
            "tags.0": "primero"
        }
    }
)

db.views.updateOne(
    {
        url: "/blog"
    },
    {
        $inc: { views: 1 }
    },
    {
        upsert: true
    }
)

db.servers.insertMany(
    [
        {
            _id: 1,
            estado: "OFF",
            prioridad: 5
        },
        {
            _id: 2,
            estado: "OFF",
            prioridad: 3
        },
        {
            _id: 3,
            estado: "OFF",
            prioridad: 1
        }
    ]
)

db.servers.findOneAndUpdate(
    {
        estado: "OFF"
    },
    {
        $set: {
            estado: "ON"
        }
    }
)

db.servers.findOneAndUpdate(
    {
        estado: "OFF"
    },
    {
        $set: {
            estado: "ON"
        },
    }, {
    $sort: {
        prioridad: -1
    },
    returnNewDocument: true
}
)






