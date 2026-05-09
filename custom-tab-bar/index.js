Component({
  data:{selected:0,list:[
    {pagePath:'/pages/recipes/recipes',text:'菜谱',iconPath:'/images/recipes.png',selectedIconPath:'/images/recipes-active.png'},
    {pagePath:'/pages/basket/basket',text:'菜篮',iconPath:'/images/basket.png',selectedIconPath:'/images/basket-active.png'},
    {pagePath:'/pages/me/me',text:'我的',iconPath:'/images/me.png',selectedIconPath:'/images/me-active.png'}
  ]},
  methods:{switchTab(e){const{index,path}=e.currentTarget.dataset;wx.switchTab({url:path});}}
});
