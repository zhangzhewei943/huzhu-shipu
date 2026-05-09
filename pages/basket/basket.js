const app = getApp();

Page({
  data: { items: [], boughtCount: 0, pendingCount: 0, recipeCount: 0 },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 });
    this.loadBasket();
  },

  loadBasket() {
    const items = app.globalData.basketItems || [];
    const boughtCount = items.filter(i => i.bought).length;
    const pendingCount = items.length - boughtCount;
    const recipeCount = new Set(items.map(i => i.recipeId)).size;
    this.setData({ items, boughtCount, pendingCount, recipeCount });
  },

  toggleItem(e) {
    const uid = e.currentTarget.dataset.uid;
    const items = app.globalData.basketItems;
    const item = items.find(i => i.uid === uid);
    if (item) item.bought = !item.bought;
    wx.setStorageSync('basketItems', JSON.stringify(items));
    this.loadBasket();
  },

  clearBasket() {
    if (app.globalData.basketItems.length === 0) {
      wx.showToast({ title: '菜篮已经是空的', icon: 'none' });
      return;
    }
    app.globalData.basketItems = [];
    wx.setStorageSync('basketItems', '[]');
    wx.showToast({ title: '已清空菜篮', icon: 'none' });
    this.loadBasket();
  },

  goRecipes() {
    wx.switchTab({ url: '/pages/recipes/recipes' });
  }
});
