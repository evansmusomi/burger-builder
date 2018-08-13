import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-260c7.firebaseio.com/"
});

export default instance;
