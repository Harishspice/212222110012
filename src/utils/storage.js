export const saveUrlData = (data) => {
  const items = JSON.parse(localStorage.getItem('urls') || '[]');
  items.push(data);
  localStorage.setItem('urls', JSON.stringify(items));
};

export const getUrlData = () => JSON.parse(localStorage.getItem('urls') || '[]');

export const findByShortcode = (code) => {
  return getUrlData().find((u) => u.shortCode === code);
};

export const recordClick = (code, click) => {
  const items = getUrlData();
  const index = items.findIndex(u => u.shortCode === code);
  if (index !== -1) {
    items[index].clicks.push(click);
    localStorage.setItem('urls', JSON.stringify(items));
  }
};