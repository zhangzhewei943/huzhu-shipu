const app = getApp();
Page({
  data: { userInfo: null, selectedCount: 0, recipeCount: 0 },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 });
    this.setData({
      userInfo: app.globalData.userInfo,
      selectedCount: app.globalData.selectedRecipes.length,
      recipeCount: app.globalData.recipes.length
    });
  },
  goLogin() { wx.navigateTo({ url: '/pages/login/login' }); },
  clearBasket() {
    app.globalData.selectedRecipes = [];
    this.setData({ selectedCount: 0 });
    wx.showToast({ title: '已清空', icon: 'success' });
  }
});
