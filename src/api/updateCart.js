import Setting from "../config/setting";

const updateCart = ( id, qty, price) => (
    fetch(`${Setting.url}update_cart.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id, qty, price })
    })
    .then(res => res.text())
);

module.exports = updateCart;