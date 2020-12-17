export const ROUTES = {
  DEFAULT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  WHOAMI: '/whoami',
  CUSTOMERS: '/customers',
  PROVIDERS: '/providers',
  DEALS: '/deals',
};

export const API_ENDPOINTS = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  USER: '/user',
  WHOAMI: '/whoami',
  CUSTOMER: '/customer',
  PROVIDER: '/provider',
  DEAL: '/deal',
  CHANGE_DEAL_STATUS: '/deal/change-status',
};

export const FORM_STATES = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const DEAL_STATUSES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const DEAL_STATUS_COLORS = {
  PENDING: '#c7c7c7',
  APPROVED: '#00a67c',
  REJECTED: '#ee752e',
};

export const USER_ROLES = {
  VIEWER: 'ROLE_VIEWER',
  EDITOR: 'ROLE_EDITOR',
  SUPERVISOR: 'ROLE_SUPERVISOR',
  ADMIN: 'ROLE_ADMIN',
};

export const USER_ROLES_TO_RENDER = {
  ROLE_VIEWER: 'Viewer',
  ROLE_EDITOR: 'Editor',
  ROLE_SUPERVISOR: 'Supervisor',
  ROLE_ADMIN: 'Admin',
};

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
