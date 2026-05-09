const BASE_URL = 'https://jojometro.cloud';
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url, method: options.method || 'GET', data: options.data || {},
      header: { 'Content-Type': 'application/json' },
      success: r => r.statusCode === 200 ? resolve(r.data) : reject(r.data),
      fail: reject
    });
  });
}
module.exports = {
  BASE_URL,
  login(code) { return request('/api/auth/login', { method: 'POST', data: { code } }); },
  getConfig() { return request('/api/config'); },
};
