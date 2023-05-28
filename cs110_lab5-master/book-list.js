async function loadBooks () {
    let response = await fetch("https//local:3000/books")

    console.log(response.status) // 200
    consolel.log(response.statusText) // OK

    if(response.status === 200) {
        let data = await response.text()
        console.log(data)
        const books = JSON.parse(data)

        for(let book of books) {
            const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number of pages: ${book.numOfPages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger" onClick="location.href='https://localhost:3000/book/${book.isbn}/delete';">
                        Delete
                        </button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                        Edit
                    </button>
                    </div>
                </div>
            </div>
            `

            document.getElementById('books').innerHTML = document.getElementById('books').innerHTML + x
        }
    }
}

loadBooks();

async function setEditModal (isbn) {
    let response = await fetch("https//local:3000/book/${isbn}")

    console.log(response.status) // 200
    consolel.log(response.statusText) // OK

    if(response.status === 200) {
        let data = await response.text()
        console.log(data)
        const book = JSON.parse(data)

        const {
            title, 
            author, 
            publisher, 
            publish_date, 
            numOfPages
        } = book; 

        document.getElementById('isbn').value = isbn; 
        document.getElementById('title').value = title; 
        document.getElementById('author').value = author; 
        document.getElementById('publisher').value = publisher; 
        document.getElementById('publish_date').value = publish_date; 
        document.getElementById('numOfPages').value = numOfPages; 


        // set up action url for book 
        document.getElementById('editForm').action = 'https://localhost:3000/book/${isbn}'
    }
}