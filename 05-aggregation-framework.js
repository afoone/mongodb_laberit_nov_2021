db.blog.aggregate(
    [
        {
            $project: {
                _id: 0,
                title: 1 
            }
        }
    ]
)