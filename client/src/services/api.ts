import axios from "axios";
import { EXPRESS_API_URL } from "../consts";

axios.defaults.baseURL = EXPRESS_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

export default axios;
