import axios from 'axios';
import type { AxiosInstance } from 'axios';

const baseURL: string = 'https://www.thecocktaildb.com/api/json/v1';

const httpClient: AxiosInstance = axios.create({ baseURL });

export default httpClient;