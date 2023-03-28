import Setting from "../config/setting";

const getOrder = (email) => (
    fetch(`${Setting.url}get_order.php`,
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
export default getOrder;