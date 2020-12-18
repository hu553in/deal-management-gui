import { API_ENDPOINTS } from '@src/constants';
import axios from 'axios';

class Customer {
  getAll() {
    return axios.get(API_ENDPOINTS.CUSTOMER);
  }

  deleteById(id) {
    return axios.delete(`${API_ENDPOINTS.CUSTOMER}/${id}`);
  }

  edit(id, product, phone) {
    return axios.patch(`${API_ENDPOINTS.CUSTOMER}/${id}`, { product, phone });
  }

  create(product, phone) {
    return axios.post(API_ENDPOINTS.CUSTOMER, { product, phone });
  }
}

export default new Customer();
