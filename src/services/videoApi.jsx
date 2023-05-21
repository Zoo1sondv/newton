import axiosClient from './axiosClient';

const videoApi = {
  getHome(config) {
    return axiosClient.get('/videos', config);
  },
};

export default videoApi;
