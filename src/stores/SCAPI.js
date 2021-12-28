//Api key shown in the http://account.spinnerchief.com/Person.aspx
let API_KEY = "api5acfcb6e9d514647b";
let username = "netman";
let password = "s3nt3ll082";
let API_URL = `http://api.spinnerchief.com:9001?`;
const corsAPI = "https://cors-anywhere.herokuapp.com/";

export const usedCredit = async() => {
    const res = await fetch(
        `${corsAPI}http://api.spinnerchief.com:9001/apikey=${API_KEY}&username=${username}&password=${password}&querytimes=1`, {
            method: "POST",
            body: "used for later",
        }
    );
    const used = await res.text();

    return used;
};

export const remainingCredit = async() => {
    const res = await fetch(
        `${corsAPI}http://api.spinnerchief.com:9001/apikey=${API_KEY}&username=${username}&password=${password}&querytimes=2`, {
            method: "POST",
            body: "remaining credit checking",
        }
    );
    let remaining = await res.text();

    remaining >= 50 && (remaining -= 150);

    if (remaining <= 0) {
        alert("No more credits for today!");
        remaining = 0;
        return;
    }
    console.log(remaining);
    return remaining;
};