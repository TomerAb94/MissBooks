export function BookPreview({ book }) {

    const { title, listPrice, thumbnail } = book

    return (
        <article className="book-preview">
            <h2>Title: {title}</h2>
           <div className="img-container">
                <img className="book-img" src={`../assets/${book.thumbnail}`} alt="Book Image" />
                {book.listPrice.isOnSale && (
                    <div className="on-sale-badge">On Sale</div>
                )}
            </div>
        </article>
    )
}