import axios from "axios";
import { EXPRESS_API_URL } from "../consts";

axios.defaults.baseURL = EXPRESS_API_URL;

export default axios;
