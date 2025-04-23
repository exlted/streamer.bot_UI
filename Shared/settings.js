export {Settings}

class Settings
{
    data = {
        websocket: {
            host: "localhost",
            port: 8080,
            endpoint: "/",
            password: "",
        },
        templateFile: "./noTemplate.html",
        duration: 10000,
    };

    constructor(file) {
        fetch(file)
            .then(res=>res.json())
            .then(data => {
                Object.assign(this.data, data);

                const params = new URL(document.URL).searchParams;
                params.forEach((value, key) => {
                    this.data[key] = decodeURIComponent(value);
                })
            })
    }
}