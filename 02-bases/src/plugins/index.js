const { getAge } = require("./get-age.plugin");
const { getUUID } = require("./get-id.plugin");
const { httpClientPlugin } = require("./http-client.plugin");

module.exports = {
    getAge,
    getUUID,
    httpClientPlugin,
}