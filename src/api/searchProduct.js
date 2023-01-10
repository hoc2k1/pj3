import Setting from "../config/setting";

const searchProduct = (key) => (
    // const url = `${Setting.url}search.php?key=${key}`;
    // return fetch(url)
    // .then(res => res.json());

    fetch(`${Setting.url}search.php`,
    {   
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ keyword: key })
    })
    .then(res => res.json())
);

export default searchProduct;
