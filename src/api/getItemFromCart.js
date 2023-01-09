import Setting from "../config/setting";

const getItemFromCart = (id) => (
    fetch(`${Setting.url}get_item_from_cart.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id_bill: id })
    })
    .then(res => res.json())
);
export default getItemFromCart;