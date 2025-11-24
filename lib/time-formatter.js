/**
 * Frontend time constants aligned with Rails ActiveSupport values
 * Rails uses 365.2425 days per year (accounting for leap years over 400 years)
 */
export const TIME_UNITS = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2592000,    // 30 days
  years: 31556952,    // 365.2425 days (Rails standard)
};

/**
 * Formats a duration in seconds to human-readable string
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) return 'None';

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (seconds < 604800) {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (seconds < 2592000) {
    const weeks = Math.floor(seconds / 604800);
    return `${weeks} week${weeks !== 1 ? 's' : ''}`;
  } else if (seconds < 31556952) {
    const months = (seconds / 2592000).toFixed(1);
    return `${months} month${Math.round(months) !== 1 ? 's' : ''}`;
  } else {
    const years = (seconds / 31556952).toFixed(1);
    return `${years} year${Math.round(years) !== 1 ? 's' : ''}`;
  }
};

/**
 * Formats duration in seconds to compact format (e.g., "1y", "12d")
 * @param {number} seconds - Duration in seconds
 * @returns {string} Compact formatted duration
 */
export const formatDurationCompact = (seconds) => {
  if (!seconds || seconds <= 0) return 'N/A';

  const day = 86400;
  const week = 604800;
  const year = 31556952;  // Rails standard

  const yearVal = Math.round(seconds / year);
  const weekVal = Math.round(seconds / week);
  const dayVal = Math.round(seconds / day);

  if (yearVal >= 1 && seconds >= year * 0.5) return `${yearVal}y`;
  if (weekVal >= 1 && seconds >= week * 0.5) return `${weekVal}w`;
  if (dayVal >= 1 && seconds >= day * 0.5) return `${dayVal}d`;
  return `${seconds}s`;
};

/**
 * Formats time remaining until a timestamp to human-readable countdown
 * @param {string|Date} nextResetAt - ISO timestamp or Date object
 * @param {string|Date} now - Current time (defaults to Date.now())
 * @returns {string} Formatted time remaining
 */
export const formatTimeUntilReset = (nextResetAt, now = new Date()) => {
  if (!nextResetAt) return null;

  const nextTime = new Date(nextResetAt).getTime();
  const currentTime = new Date(now).getTime();
  const remainingMs = nextTime - currentTime;

  if (remainingMs <= 0) return 'Ready to reset';

  const seconds = Math.floor(remainingMs / 1000);

  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  } else {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  }
};

