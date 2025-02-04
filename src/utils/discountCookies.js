import Cookies from 'js-cookie';

const DISCOUNT_COOKIE_NAME = 'guide_discount_expires';
const DEFAULT_DISCOUNT_DAYS = 3;

export const getDiscountExpiration = () => {
  try {
    const expires = Cookies.get(DISCOUNT_COOKIE_NAME);
    if (!expires) return null;
    
    const date = new Date(expires);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.error('Error getting discount expiration:', error);
    return null;
  }
};

export const setDiscountExpiration = () => {
  try {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + DEFAULT_DISCOUNT_DAYS);
    Cookies.set(DISCOUNT_COOKIE_NAME, expirationDate.toISOString(), { 
      expires: DEFAULT_DISCOUNT_DAYS,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    return expirationDate;
  } catch (error) {
    console.error('Error setting discount expiration:', error);
    return null;
  }
};

export const isDiscountActive = () => {
  try {
    const expiration = getDiscountExpiration();
    return expiration ? new Date() < expiration : false;
  } catch (error) {
    console.error('Error checking discount status:', error);
    return false;
  }
};

export const getTimeRemaining = () => {
  try {
    const expiration = getDiscountExpiration();
    if (!expiration) return null;

    const now = new Date();
    const diff = expiration.getTime() - now.getTime();
    
    if (diff <= 0) return null;

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      total: diff
    };
  } catch (error) {
    console.error('Error calculating time remaining:', error);
    return null;
  }
};
