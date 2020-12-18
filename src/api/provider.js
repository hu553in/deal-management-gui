import { API_ENDPOINTS } from '@src/constants';
import axios from 'axios';

class Provider {
  getAll() {
    return axios.get(API_ENDPOINTS.PROVIDER);
  }

  deleteById(id) {
    return axios.delete(`${API_ENDPOINTS.PROVIDER}/${id}`);
  }

  edit(id, product, phone, email) {
    return axios.patch(`${API_ENDPOINTS.PROVIDER}/${id}`, {
      product,
      phone,
      email,
    });
  }

  create(product, phone, email) {
    return axios.post(API_ENDPOINTS.PROVIDER, { product, phone, email });
  }
}

export default new Provider();
