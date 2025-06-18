import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect, Fragment } = React

export function BookIndex() {
    
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(BookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        BookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        BookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

    function onSetFilter(filterBy) { // ex: {txt:'asd'}
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>
  
    return (
        <section className="book-index">
            {selectedBookId &&
                <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setSelectedBookId(null)}
                />
            }
            {!selectedBookId &&
                <Fragment>
                    <BookFilter
                        defaultFilter={filterBy}
                        onSetFilter={onSetFilter}
                    />
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            }
        </section>
    )


}