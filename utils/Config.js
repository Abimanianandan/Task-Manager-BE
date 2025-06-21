require("dotenv").config();

const Mongodb_URL = process.env.Mongodb_URL;
const Port = process.env.Port;
const Secret_KEY = process.env.Secret_KEY;

module.exports = {Mongodb_URL,Port,Secret_KEY}; 