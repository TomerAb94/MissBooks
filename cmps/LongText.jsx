const {useState} = React

export  function LongText({txt, length=50}){

    const [isExpended, setIsExpended] = useState(true) 


    return(
        <p className="long-text">{isExpended?txt: txt.substring(0,length)} 
        <span className="read-more" onClick={()=>setIsExpended(!isExpended)}>{isExpended ? ' read less...' :' read more...'}</span></p>
    )

}

