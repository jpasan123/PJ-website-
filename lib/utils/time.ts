export function getTimeRemaining(endTime: string) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
      isExpired: total <= 0
    };
  }
  
  export function formatTimeRemaining(endTime: string): string {
    const time = getTimeRemaining(endTime);
    
    if (time.isExpired) return 'Expired';
    
    if (time.days > 0) {
      return `${time.days}d ${time.hours}h remaining`;
    }
    
    if (time.hours > 0) {
      return `${time.hours}h ${time.minutes}m remaining`;
    }
    
    return `${time.minutes}m ${time.seconds}s remaining`;
  }