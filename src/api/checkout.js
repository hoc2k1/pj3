import Setting from "../config/setting";

const checkout = ( id, total, name, email, address, phone) => (
    fetch(`${Setting.url}checkout.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ id, total, name, email, address, phone })
    })
    .then(res => res.text())
);

module.exports = checkout;