class AuthManagementService {
  setToken(token) {
    localStorage.setItem('token', token);
  }

  isAuthDataPresent() {
    return (
      localStorage.getItem('user') !== null &&
      localStorage.getItem('token') !== null
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export default new AuthManagementService();
