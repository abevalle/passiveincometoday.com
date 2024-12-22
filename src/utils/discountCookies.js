import Cookies from 'js-cookie';

const DISCOUNT_COOKIE_NAME = 'guide_discount_expires';
const DEFAULT_DISCOUNT_DAYS = 3;

export const getDiscountExpiration = () => {
  const expires = Cookies.get(DISCOUNT_COOKIE_NAME);
  return expires ? new Date(expires) : null;
};

export const setDiscountExpiration = () => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + DEFAULT_DISCOUNT_DAYS);
  Cookies.set(DISCOUNT_COOKIE_NAME, expirationDate.toISOString(), { expires: DEFAULT_DISCOUNT_DAYS });
  return expirationDate;
};

export const isDiscountActive = () => {
  const expiration = getDiscountExpiration();
  return expiration ? new Date() < new Date(expiration) : false;
};

export const getTimeRemaining = () => {
  const expiration = getDiscountExpiration();
  if (!expiration) return null;

  const now = new Date();
  const diff = new Date(expiration) - now;
  
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  };
};
