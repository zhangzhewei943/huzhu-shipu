const app = getApp();

Page({
  data: {
    categories: ['荤菜','素菜','凉菜','汤羹','主食','甜点','美酒'],
    catKeys: {'荤菜':'meat','素菜':'veg','凉菜':'salad','汤羹':'soup','主食':'rice','甜点':'cake','美酒':'wine'},
    activeCat: '全部',
    recipes: [],
    displayRecipes: [],
    selectedCount: 0
  },

  onLoad() {
    this.syncFromGlobal();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 });
    this.syncFromGlobal();
  },

  syncFromGlobal() {
    const sel = app.globalData.selectedRecipes;
    const recipes = app.globalData.recipes.map(r => ({
      ...r,
      selected: !!sel.find(s => s.id === r.id)
    }));
    this.setData({ recipes, selectedCount: sel.length });
    this.updateDisplay();
  },

  updateDisplay() {
    let list = this.data.activeCat === '全部'
      ? [...this.data.recipes]
      : this.data.recipes.filter(r => r.category === this.data.activeCat);
    list = list.map(r => ({
      ...r,
      selected: !!app.globalData.selectedRecipes.find(s => s.id === r.id)
    }));
    this.setData({ displayRecipes: list });
  },

  filterCat(e) {
    this.setData({ activeCat: e.currentTarget.dataset.cat });
    this.updateDisplay();
  },

  toggleSelect(e) {
    const id = e.currentTarget.dataset.id;
    const sel = app.globalData.selectedRecipes;
    const idx = sel.findIndex(s => s.id === id);
    if (idx > -1) {
      sel.splice(idx, 1);
      wx.showToast({ title: '已移出清单', icon: 'none', duration: 1000 });
    } else {
      const recipe = this.data.recipes.find(r => r.id === id);
      if (recipe) {
        sel.push(recipe);
        wx.showToast({ title: '已添加到待生成', icon: 'none', duration: 1000 });
      }
    }
    wx.setStorageSync('selectedRecipes', JSON.stringify(sel));
    this.setData({ selectedCount: sel.length });
    this.updateDisplay();
  },

  openDetail(e) {
    const id = e.currentTarget.dataset.id;
    const recipe = app.globalData.recipes.find(r => r.id === id);
    if (recipe) {
      app.globalData.currentRecipe = recipe;
      wx.navigateTo({ url: '/pages/detail/detail' });
    }
  },

  clearAll() {
    if (app.globalData.selectedRecipes.length === 0) {
      wx.showToast({ title: '当前没有选择', icon: 'none' });
      return;
    }
    app.globalData.selectedRecipes = [];
    wx.setStorageSync('selectedRecipes', '[]');
    this.setData({ selectedCount: 0 });
    this.updateDisplay();
    wx.showToast({ title: '已清空选择', icon: 'none' });
  },

  goBasket() {
    if (app.globalData.selectedRecipes.length === 0) {
      wx.showToast({ title: '先添加至少一道菜', icon: 'none' });
      return;
    }
    this.generateBasket();
    wx.switchTab({ url: '/pages/basket/basket' });
  },

  generateBasket() {
    const sel = app.globalData.selectedRecipes;
    const existing = new Map(app.globalData.basketItems.map(i => [i.uid, i]));
    const items = [];
    sel.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const uid = recipe.id + ':' + ing;
        items.push({
          uid,
          recipeId: recipe.id,
          recipeName: recipe.name,
          text: ing,
          bought: existing.has(uid) ? existing.get(uid).bought : false
        });
      });
    });
    app.globalData.basketItems = items;
    wx.setStorageSync('basketItems', JSON.stringify(items));
  },

  onSearch() { wx.showToast({ title: '搜索功能 · 原型演示', icon: 'none' }); }
});
