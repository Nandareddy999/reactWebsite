const axios = require("axios");
function getdata() {
    axios.get("http://localhost:8080/movie/getData").then((result) => {
        console.log(result.data);
    });
}

window.onload = function () {
    getdata();
}