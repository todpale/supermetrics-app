export function getCookie (name) {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie (key, value) {
  const date = Date.now();
  const expires = new Date(date + 3600 * 1000).toUTCString();
  document.cookie = `${key}=${value}; path=/; expires=${expires}`;
}

export function deleteCookie (key) {
  const date = new Date();
  const expires = date.toUTCString();
  document.cookie = `${key}=''; path=/; expires=${expires}`;
}
