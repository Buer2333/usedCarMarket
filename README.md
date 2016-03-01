#usedCarMarket
Used-car Market
---

####分支部属

| 人员        | 分支     |
| ---------- |:--------:|
| 缪兴隆      | master   |
| 潘抱一   | pby    |



####安装方法
	// 需要browserify和http-server支持，请全局安装
	cnpm install -g http-server browserify
	// 克隆项目,或者使用webstorm
	git clone https://git.coding.net/bringdy/work.git
	// 安装依赖模块
	npm install
	// 启动http-server,默认端口为：8080
	npm start
	// js生成命令
	browserify 待生成 -o 生成目标文件
	
#### 统一结构目录
- js/ 
    + pages/  _局部脚本_
- css/  _样式_
- fonts/  _字体图标_
- less/  _动态样式库_
- img/  _媒体图片_
- index.html
	
#### 插件参考API
|名称|功能描述|链接|
| ----- |:-----:|:-----:|
|Animate|CSS3动态样式库|[Animate](https://github.com/daneden/animate.css)|
|Swiper|幻灯片|[Swiper](http://www.swiper.com.cn/)|
|PageTransitions|页面变换|[PageTransitions](https://github.com/codrops/PageTransitions)|
|Hover|鼠标经过效果|[Hover](http://ianlunn.github.io/Hover/)|
