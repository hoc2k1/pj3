import Setting from "../config/setting";

const getCart = (email) => (
    fetch(`${Setting.url}get_cart.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(res => res.json())
);
export default getCart;