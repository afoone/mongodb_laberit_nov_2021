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
          $each:   ["tg1", "tg2", "tg3"]
        }
    }
}
)


