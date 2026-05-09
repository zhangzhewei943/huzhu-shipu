const app = getApp();
Page({
  data: { selectedCount: 0, recipeCount: 0, basketItems: 0 },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 2 });
    this.setData({
      selectedCount: app.globalData.selectedRecipes.length,
      recipeCount: app.globalData.recipes.length,
      basketItems: app.globalData.basketItems.length
    });
  },
  clearBasket() {
    app.globalData.basketItems = [];
    wx.setStorageSync('basketItems', '[]');
    this.setData({ basketItems: 0 });
    wx.showToast({ title: '已清空菜篮', icon: 'none' });
  },
  clearSelection() {
    app.globalData.selectedRecipes = [];
    wx.setStorageSync('selectedRecipes', '[]');
    this.setData({ selectedCount: 0 });
    wx.showToast({ title: '已清空选择', icon: 'none' });
  }
});
