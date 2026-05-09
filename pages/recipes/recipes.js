const app = getApp();
Page({
  data: {
    categories: ['荤菜','素菜','凉菜','汤羹','主食','甜点','美酒'],
    activeCat: '全部',
    recipes: [],
    displayRecipes: [],
    selectedCount: 0
  },
  onLoad() {
    const recipes = app.globalData.recipes.map(r => ({
      ...r,
      selected: !!app.globalData.selectedRecipes.find(s => s.id === r.id)
    }));
    this.setData({ recipes, selectedCount: app.globalData.selectedRecipes.length });
    this.filterCat({ currentTarget: { dataset: { cat: '全部' } } });
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 0 });
    const selectedCount = app.globalData.selectedRecipes.length;
    this.setData({ selectedCount });
    this.updateDisplay();
  },
  filterCat(e) {
    const cat = e.currentTarget.dataset.cat;
    this.setData({ activeCat: cat });
    this.updateDisplay();
  },
  updateDisplay() {
    let list = this.data.activeCat === '全部' ? [...this.data.recipes] : this.data.recipes.filter(r => r.category === this.data.activeCat);
    list = list.map(r => ({ ...r, selected: !!app.globalData.selectedRecipes.find(s => s.id === r.id) }));
    this.setData({ displayRecipes: list });
  },
  toggleSelect(e) {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id;
    const recipe = this.data.recipes.find(r => r.id === id);
    if (!recipe) return;
    const sel = app.globalData.selectedRecipes;
    const idx = sel.findIndex(s => s.id === id);
    if (idx > -1) sel.splice(idx, 1);
    else sel.push(recipe);
    this.setData({ selectedCount: sel.length });
    this.updateDisplay();
  },
  openDetail(e) {
    const id = e.currentTarget.dataset.id;
    const recipe = app.globalData.recipes.find(r => r.id === id);
    if (recipe) { app.globalData.currentRecipe = recipe; wx.navigateTo({ url: '/pages/detail/detail' }); }
  },
  onSearch() {},
  goBasket() { wx.switchTab({ url: '/pages/basket/basket' }); }
});
