const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs');
const path = require('path');


const app = express()
const port = 3000

// where we will keep books
let books = []

app.use(cors())

// configure body parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/book', (req, res) => {
    const book = req.body; 

    // output book to console for debugging 
    console.log(book)
    books.push(book)
})

// Read the book.json file and parse its contents into the books array
const bookDataPath = path.join(__dirname, 'data', 'book.json');
fs.readFile(bookDataPath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  books = JSON.parse(data);
});

app.get('/books', (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/book/:isbn', (req, res) => {
    // read isbn from url
    const isbn = req.params.isbn
    const newBook = req.body

    // remove item form books array
    for(let i=0; i < books.length; i++){
        let book = books[i]

        if (book.isbn === isbn){
            books[i] = newBook
        }
    }

    // send 404 when not found
    res.send('Book is edited')
})