import { Book } from "../db/Books.model.js";
//to add the books
const addBooks = async (req, res) => {
    try {
        const { name, refAuthor, numberofChapters } = req.body

        const bookExists = await Book.findOne({ name })

        if (bookExists) {
            return res.status(400).json({
                success: false,
                error: "the book already exists"
            })
        }
        const newBook = await Book.create({
            name,
            refAuthor,
            numberofChapters
        })
        return res.status(201).json({
            success: true,
            data: newBook,
            message: "Book added successfully."
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "server error , Please try again later !"
        })
    }
}





//get all the available books
const books = async (req, res) => {
    try {
        const allBooks = await Book.find({});


        if (!allBooks || allBooks.length === 0) {
            return res.status(404).json({
                "success": false,
                "error": "books not available"
            })
        }
        return res.status(200).json({
            "success": true,
            "data": allBooks,
            "message": "Books fetched successfully from the server"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "server error , Please try again later !"
        })
    }
}

// to get the specific book

const targetBook = async (req , res)=>{
    try {
        const { id } = req.params;
        
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({
                "success": false,
                "error": "book not available"
            })
        }
        return res.status(200).json({
            "success": true,
            "data": book,
            "message": "Books fetched successfully from the server"
        })
        
        
        
    } catch (error) {
        console.log(error);
        
        res.status(500).json({
            success: false,
            error: "server error , Please try again later !"
        })
    }
}






export { targetBook }
export { addBooks }
export { books }