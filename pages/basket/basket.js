const app = getApp();
Page({
  data: { recipes: [], items: [], checkedCount: 0 },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) this.getTabBar().setData({ selected: 1 });
    this.loadBasket();
  },
  loadBasket() {
    const recipes = app.globalData.selectedRecipes.map(r => ({
      ...r,
      ingredients: r.ingredients.map((ing, i) => ({ text: ing, checked: false }))
    }));
    const items = recipes.reduce((arr, r) => arr.concat(r.ingredients), []);
    this.setData({ recipes, items, checkedCount: 0 });
  },
  toggleItem(e) {
    const { rid, iid } = e.currentTarget.dataset;
    const recipes = this.data.recipes;
    const r = recipes.find(r => r.id === rid);
    if (!r) return;
    r.ingredients[iid].checked = !r.ingredients[iid].checked;
    const checkedCount = recipes.reduce((c, r) => c + r.ingredients.filter(i => i.checked).length, 0);
    this.setData({ recipes, checkedCount });
  }
});
