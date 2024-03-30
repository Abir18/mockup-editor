import Axios from "axios";
import { apiBaseURL } from "enums";

const axios = Axios.create({
  baseURL: apiBaseURL,
});

axios.CancelToken = Axios.CancelToken;

export default axios;
