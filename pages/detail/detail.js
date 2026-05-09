const app = getApp();
Page({
  data: { recipe: null },
  onLoad() { this.setData({ recipe: app.globalData.currentRecipe }); }
});
