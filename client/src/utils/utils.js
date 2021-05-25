import Axios from 'axios';

import { API } from './keys.json';

export default Axios.create({
    baseURL: API,
    withCredentials: true,
});
