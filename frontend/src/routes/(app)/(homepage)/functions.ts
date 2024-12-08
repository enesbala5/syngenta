/**
 * Converts total seconds to a human-readable time string.
 * 
 * @param {number} totalSeconds - The total number of seconds to convert
 * @param {Object} [options] - Optional configuration object
 * @param {boolean} [options.showSeconds=true] - Whether to include seconds in the output
 * @param {boolean} [options.shortFormat=false] - Whether to use a shorter format (4:57 vs 4:57 minutes)
 * @returns {string} Formatted time string
 */
export function formatSeconds(totalSeconds, options = {}) {
  // Ensure input is a number and handle edge cases
  const seconds = Math.max(0, Math.floor(Number(totalSeconds)));
  
  // Default options
  const {
    showSeconds = true,
    shortFormat = false
  } = options;

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Format the output
  if (minutes === 0) {
    // Less than a minute
    return showSeconds 
      ? `${seconds}${shortFormat ? '' : ' seconds'}` 
      : '0 minutes';
  } else if (minutes < 60) {
    // Between 1 and 59 minutes
    const formattedSeconds = showSeconds 
      ? `:${remainingSeconds.toString().padStart(2, '0')}` 
      : '';
    
    return `${minutes}${formattedSeconds}${shortFormat ? '' : ' minutes'}`;
  } else {
    // 60 minutes or more
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    const hourPart = `${hours} hour${hours !== 1 ? 's' : ''}`;
    const minutePart = remainingMinutes > 0 
      ? ` ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}` 
      : '';
    
    return shortFormat 
      ? `${hours}:${remainingMinutes.toString().padStart(2, '0')}`
      : `${hourPart}${minutePart}`;
  }
}
