import Setting from "../config/setting";


const signIn = (email, password) => (
    fetch(`${Setting.url}login.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.text())
);

module.exports = signIn;
