import Setting from "../config/setting";

const getProductById = (id) => (
    fetch(`${Setting.url}get_product_by_id.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id_product: id })
    })
    .then(res => res.json())
);
export default getProductById;