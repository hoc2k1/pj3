import Setting from "../config/setting";

const deleteOrder = (id) => (
    fetch(`${Setting.url}delete_order.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id })
    })
    .then(res => res.text())
);
export default deleteOrder;