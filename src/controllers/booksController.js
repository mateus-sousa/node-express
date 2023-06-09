import books from "../models/Book.js"

class BooksController {
    static getAll = (req, res) => {
        books.find()
            .populate('author')
            .exec((err, books) => {
            res.status(200).json(books)
        })  
    }

    static getById = (req, res) => {
        let id = req.params.id
        books.findById(id)
        .populate('author', 'name')
        .exec((err, books) => {
            if (err) {
                res.status(404).send({message: err.message})
            } else {
                res.status(200).send(books)
            }            
        })  
    } 

    static create = (req, res) => {
        let book = new books(req.body)
        book.save((err) => {
            if(err) {
                res.status(500).send({message: err.message})
            } else {
                res.status(201).send(book.toJSON())
            }
        })
    }

    static update = (req, res) => {
        let id = req.params.id 
        books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err) {
                res.status(500).send({message: err.message})            
            } else {
                res.status(200).send({message: 'Livro atualizado com sucesso'})
            }
        })
    }

    static delete = (req, res) => {
        let id = req.params.id

        books.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message: 'Livro excluido com sucesso'})
            }
        })
    }

    static getByPublisher = (req, res) => {
        const publisher = req.query.publisher
        books.find({'publisher': publisher}, {}, (err, books) => {
            res.status(200).send(books)
        })
    }
}

export default BooksController