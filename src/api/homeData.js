import Setting from "../config/setting";

const homeData = () => (
    fetch(Setting.url)
    .then(res => res.json())
);

export default homeData;
