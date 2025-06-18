import { BookPreview } from "../cmps/BookPreview.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
            })
    }

    function getPublishDate(publishedDate) {
        const diff = new Date().getFullYear() - publishedDate

        if (diff > 10) return `Vintage, ${publishedDate}`
        else return `New, ${publishedDate}`

    }

    function getPriceClass(amount) {
        if (amount > 150) return 'red'
        if (amount < 20) return 'green'

    }

    function getPageCount(pageCount) {
        if (pageCount > 500) return `${pageCount}, Serious Reading`
        if (pageCount > 200) return `${pageCount}, Descent Reading`
        if (pageCount < 100) return `${pageCount}, Light Reading`
    }

    if (!book) return <div>Loading...</div>
    // const { title, listPrice, thumbnail, subtitle } = book
    return (
        <section className="book-details container">
            {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}

            <h1>Title: {book.title}</h1>

            <div className="img-container">
                <img className="book-img" src={`../assets/${book.thumbnail}`} alt="Book Image" />
                {book.listPrice.isOnSale && (
                    <div className="on-sale-badge">On Sale</div>
                )}
            </div>

            <h3>Price: <span className={`book-price ${getPriceClass(book.listPrice.amount)}`}>{book.listPrice.amount}</span></h3>
            <h4>Subtitle: {book.subtitle}</h4>
            <p>{book.description}</p>

            <section>
                <h4>Authors</h4>
                <ul className="authors-list">
                    {book.authors.map(author => <li key={author}>{author}</li>)}
                </ul>
            </section>

            <p>Published Date: {getPublishDate(book.publishedDate)}</p>
            <p>Page Count: {getPageCount(book.pageCount)}</p>
            <button onClick={onBack}>Back</button>
        </section>

    )
}