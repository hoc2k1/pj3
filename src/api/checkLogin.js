import Setting from "../config/setting";

const checkLogin = (token) => (
    fetch(`${Setting.url}check_login.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(res => res.text())
);

module.exports = checkLogin;
