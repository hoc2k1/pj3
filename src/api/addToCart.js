import Setting from "../config/setting";

const addToCart = ( id_bill, id_product, price, color, size) => (
    
    fetch(`${Setting.url}add_to_cart.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id_bill, id_product, price, color: color.toString(), size })
    })
    .then(res => res.text())  
);

module.exports = addToCart;