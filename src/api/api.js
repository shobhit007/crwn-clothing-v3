import axios from "axios";

export default axios.create({
  baseURL: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "53e6ae3225mshe929f12ecc0a34dp14687fjsn2df85cbb7d91",
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  },
});
