# slide-module-demo
点击查看 [demo](http://cqhpoldi.com/slide-module-demo/slide-module-demo.html)
**html** 代码如下:

	<div id="demo">
	    <div id="div2" class="slide-wrapper">
		<img src="http://cqhpoldi.com/alien-5.png"/>
	    </div>
	</div>
举例div2为滑动模块，必需是相对于浏览器的绝对定位

    .slide-wrapper {
	   width: 60px;
	   height: 60px;
	   border-radius: 50%;
	   border: 1px solid rgba(0, 0, 0, 0.1);
	   position: fixed;
	   right: 10px;
	   bottom: 30%;
     }
**js** 代码如下:

1.引入js

    <script src="./slidingModule.js"></script>
2.初始化

    new slideModule({
	   container: "div2",
	   limitTop: 50,
	   limitBottom: 50,
	   limitLeft: 10,
	   limitRight: 10,
	   onClick: function () {
		   console.log("点击滑块！")
	   }
    })

	// container: 元素id
	// limitTop: 能触及的最顶部高度
	// limitBottom: 能触及的最底部高度
	// limitLeft: 最左侧悬停距离
	// limitRight: 最右侧悬停距离
	// onClick: 元素点击事件
