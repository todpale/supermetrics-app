import axios from 'axios';

export const ajax = async (url, data = {}, method = 'post') => {
  return axios({
    method,
    url,
    data,
    timeout: 60000
  })
}
