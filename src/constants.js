export const ROUTES = {
  DEFAULT: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  WHOAMI: '/whoami',
  CUSTOMERS: '/customers',
  PROVIDERS: '/providers',
  DEALS: '/deals'
};

export const DEAL_STATUSES = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export const DEAL_STATUS_COLORS = {
  PENDING: '#c7c7c7',
  APPROVED: '#00a67c',
  REJECTED: '#ee752e'
};

export const USER_ROLES = {
  VIEWER: 'VIEWER',
  EDITOR: 'EDITOR',
  SUPERVISOR: 'SUPERVISOR',
  ADMIN: 'ADMIN'
};

export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
