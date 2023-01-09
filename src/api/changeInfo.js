import Setting from "../config/setting";

const changeInfo = ( email, name, phone, address) => (
    fetch(`${Setting.url}change_info.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, name, phone, address })
    })
    .then(res => res.json())
);

module.exports = changeInfo;