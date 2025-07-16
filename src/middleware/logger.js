export const logEvent = (type, message, meta = {}) => {
  const logs = JSON.parse(localStorage.getItem('logs') || '[]');
  logs.push({ type, message, meta, timestamp: new Date().toISOString() });
  localStorage.setItem('logs', JSON.stringify(logs));
};