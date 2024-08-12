module.exports = {
    secret: process.env.NODE_ENV === "production" ? process.env.SECRET : "Y234ORGODFYHWHG4JESUS656DFG446VWAASQRTT45663402J0S3V4N0L1V31R407",
    api: process.env.NODE_ENV === "production" ? "https://api.loja-teste.ampliee.com" : "http://localhost:5000",
    loja: process.env.NODE_ENV === "production" ? "https://loja-teste.ampliee.com" : "http://localhost:8000"
};