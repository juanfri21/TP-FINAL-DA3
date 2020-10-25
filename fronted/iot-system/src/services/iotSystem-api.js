import axios from 'axios';
// import configService from './config'

const iotSystemApi = axios.create({
	baseURL: 'http://localhost:8000/api',
});

export default iotSystemApi;
