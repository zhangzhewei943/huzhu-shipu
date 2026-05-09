const app = getApp();
const api = require('../../utils/api.js');
Page({
  wxLogin() {
    wx.login({
      success: async r => {
        if (!r.code) return wx.showToast({ title: '登录失败', icon: 'none' });
        try {
          const data = await api.login(r.code);
          if (data.ok) {
            app.globalData.userInfo = data.user;
            wx.showToast({ title: '登录成功', icon: 'success', duration: 1000 });
            setTimeout(() => wx.switchTab({ url: '/pages/recipes/recipes' }), 1000);
          }
        } catch(e) { wx.showToast({ title: '登录失败', icon: 'none' }); }
      },
      fail: () => wx.showToast({ title: '登录失败', icon: 'none' })
    });
  }
});
