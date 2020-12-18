import { API_ENDPOINTS } from '@src/constants';
import axios from 'axios';

class Deal {
  getAll() {
    return axios.get(API_ENDPOINTS.DEAL);
  }

  deleteById(id) {
    return axios.delete(`${API_ENDPOINTS.DEAL}/${id}`);
  }

  edit(id, customerId, providerId, description) {
    return axios.patch(`${API_ENDPOINTS.DEAL}/${id}`, {
      customerId,
      providerId,
      description,
    });
  }

  create(customerId, providerId, description) {
    return axios.post(API_ENDPOINTS.DEAL, {
      customerId,
      providerId,
      description,
    });
  }

  changeStatus(id, status) {
    return axios.patch(
      `${API_ENDPOINTS.CHANGE_DEAL_STATUS}/${id}?status=${status}`
    );
  }
}

export default new Deal();
