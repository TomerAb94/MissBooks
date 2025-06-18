const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    /* 
     function handleTxtChange({ target }) {
         const value = target.value
         setFilterByToEdit(prevFilter => ({...prevFilter, txt: value}))
     }
 
     function handleMinSpeedChange({ target }) {
         const value = target.value
         setFilterByToEdit(prevFilter => ({...prevFilter, minSpeed: +value}))
     }
    */

    const { title, minPrice,isOnSale } = filterByToEdit
    
    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>

            <form>
                <label htmlFor="title">Book Title</label>
                <input onChange={handleChange} value={title} name="title" id="title" type="text" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />
                
                <label htmlFor="isOnSale">On Sale</label>
                <input onChange={handleChange} value={isOnSale} name="isOnSale" id="isOnSale" type="checkbox" />
            </form>
        </section>
    )
}