import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-app-6fd63-default-rtdb.firebaseio.com/"
});

export default instance;