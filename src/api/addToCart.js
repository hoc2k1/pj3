import Setting from "../config/setting";

const addToCart = ( id_bill, id_product, price) => (
    fetch(`${Setting.url}add_to_cart.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id_bill, id_product, price })
    })
    .then(res => res.text())
);

module.exports = addToCart;