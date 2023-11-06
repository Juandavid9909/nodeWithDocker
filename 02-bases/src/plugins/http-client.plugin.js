const httpClientPlugin = {
    get: async(url) => {
        const resp = await fetch(url);

        return await resp.json();
    },
    post: async(url, body) => {},
    put: async(url, body) => {},
    delete: async(url) => {}
}

module.exports = {
    http: httpClientPlugin,
}