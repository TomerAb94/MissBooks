export function BookPreview({ book }) {
    
    const { title, listPrice , thumbnail} = book
    
    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
            <h4>Book Price: {listPrice.amount}</h4>
            <img src={`../assets/${thumbnail}`} alt="Book Image" />
        </article>
    )
}