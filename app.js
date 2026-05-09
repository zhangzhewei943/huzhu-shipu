App({
  globalData: {
    userInfo: null,
    selectedRecipes: [],
    recipes: [
      { id: 'tomato-beef', name: '番茄牛腩焖饭', category: '荤菜', time: '45分钟', image: '', color: '#E8B44F', ingredients: ['牛腩 300g', '番茄 2个', '洋葱 半个', '大米 2杯', '姜片 3片', '盐 适量'], steps: ['牛腩切块焯水去血沫', '番茄切块，洋葱切丝', '热锅少油，炒香洋葱', '加入牛腩翻炒，放番茄炒出汁', '加水和调料煮开，倒入米饭中', '大火煮开转小火焖20分钟'] },
      { id: 'pepper-pork', name: '青椒炒肉丝', category: '荤菜', time: '20分钟', image: '', color: '#6FBF6F', ingredients: ['猪里脊 200g', '青椒 2个', '蒜 3瓣', '生抽 1勺', '淀粉 1勺'], steps: ['猪肉切丝，加生抽和淀粉腌制10分钟', '青椒切丝，蒜切末', '热锅凉油，下肉丝滑炒变色盛出', '锅中留底油，爆香蒜末', '下青椒翻炒至断生', '倒回肉丝翻炒均匀出锅'] },
      { id: 'shrimp-egg', name: '虾仁滑蛋盖饭', category: '荤菜', time: '18分钟', image: '', color: '#E88F8F', ingredients: ['虾仁 150g', '鸡蛋 3个', '米饭 1碗', '葱花 少许', '盐 适量'], steps: ['虾仁用料酒和盐腌制5分钟', '鸡蛋打散加少许盐', '热锅加油，虾仁煎至变色', '倒入蛋液，用筷子轻轻搅动', '待蛋液七成熟关火，余温继续', '盖在热米饭上，撒葱花'] },
      { id: 'mushroom-noodle', name: '菌菇鸡汤面', category: '汤羹', time: '30分钟', image: '', color: '#B8A8D8', ingredients: ['鸡腿 1只', '干香菇 5朵', '面条 200g', '姜片 2片', '枸杞 少许'], steps: ['干香菇提前泡发', '鸡腿冷水下锅加姜片焯水', '换清水，放鸡腿和香菇大火煮开', '转小火炖20分钟', '另起锅煮面至断生捞出', '面碗倒入鸡汤，摆上鸡腿和香菇'] }
    ],
    currentRecipe: null
  },

  checkLogin(callback) {
    if (this.globalData.userInfo) {
      callback && callback();
    } else {
      wx.navigateTo({ url: '/pages/login/login' });
    }
  }
});
