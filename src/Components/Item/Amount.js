const Amount = (prop) =>{
    const price = prop.amt;
    let amountInK = 0;
    if ( price > 999 ){
        amountInK = price / 1000 + 'K';
    }
    else {
        amountInK = price;
    }
    
    return (
        <div >
            <p className="item_amount">
              {amountInK}   Ks
            </p>
    </div>
    )
}
export default Amount;