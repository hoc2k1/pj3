import Setting from "../config/setting";

const createNewCart = (email) => (
    fetch(`${Setting.url}create_new_cart.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(res => res.text())
);

module.exports = createNewCart;