angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, ionicDatePicker, localStorage){

  //绑定数据结构
  $scope.data = {
    id: Date.now(),
    class: "支出",
    subclass: "餐饮",
    value: "0",
    date: Date.now()
  };

  /*//001 - 999的随机数
  function random(){
    var x = (Math.round(Math.random()* 999)).toString();
    if(x < 100){
      if(x < 10){
        x = "00" + x;
      }
      x = "0" + x;
    }
    return x;
  }*/

  // 配置日期选项
  var dateConfig = {
    callback: function (val) {
      //console.log(val);  //val为选择日期的时间戳
      $scope.data.id = val;
    },
    from: new Date((new Date()).getFullYear() - 5, 1, 1),
    to: new Date()
  };
  //触发弹出日期选择框
  $scope.openDatePicker = function () {
    ionicDatePicker.openDatePicker(dateConfig);
  };

  //计算器
  $scope.sum = "";
  $scope.flag = true;
  $scope.num = function(a){
    var reg=/\d/ig; //全局找0-9的数字
    var dot=/\./ig; //全局中找小数点
    var plus=/\+/ig; //全局中找+号
    if(reg.test(a)){
      if($scope.flag === false){
        $scope.flag = true;
      }
      if ($scope.sum !== 0 && $scope.flag && $scope.sum !== "error" && $scope.sum.length < 9) {
        $scope.sum +=a;
      }else{
        $scope.flag = false;
      }
    }else if(a == "AC"){
      $scope.sum="";
    }else if(a == '.'){
      if($scope.sum !== "" && !dot.test($scope.sum) && $scope.sum.length < 9){
        $scope.sum+=a;
      }
    }else if(a == 'C'){
        $scope.sum = $scope.sum.toString().substr(0, $scope.sum.length - 1);
    }else if(a == '+'){
      if($scope.sum !== "" && !plus.test($scope.sum) && $scope.sum.length < 9){
        $scope.sum+=a;
      }
    }else if(a == 'OK'){
      if($scope.sum !== "" && $scope.flag && $scope.sum !== "error"){
        $scope.sum = $scope.sum.split("+").reduce(function(a, b){
          return a * 1 + b * 1;
        });
      }
      $scope.data.value = $scope.sum;
      localStorage.save($scope.data);
      $scope.sum = "";
      $scope.flag = false;
    }
  };

  //数据的结构和存储
  $scope.subclass = [
    [
      {
        icon: "ion-ios-wineglass",
        expense: "餐饮",
        class: "支出"
      },
      {
        icon: "ion-beer",
        expense: "零食烟酒",
        class: "支出"
      },
      {
        icon: "ion-android-cart",
        expense: "购物",
        class: "支出"
      },
      {
        icon: "ion-android-home",
        expense: "住房",
        class: "支出"
      },
      {
        icon: "ion-android-bus",
        expense: "交通",
        class: "支出"
      },
      {
        icon: "ion-ios-game-controller-b",
        expense: "娱乐",
        class: "支出"
      },
      {
        icon: "ion-ios-people",
        expense: "文教",
        class: "支出"
      },
      {
        icon: "ion-model-s",
        expense: "汽车",
        class: "支出"
      },
      {
        icon: "ion-android-call",
        expense: "通讯",
        class: "支出"
      },
      {
        icon: "ion-happy",
        expense: "育儿",
        class: "支出"
      }
    ],
    [
      {
        icon: "ion-ios-calculator",
        expense: "资薪",
        class: "收入"
      },
      {
        icon: "ion-ribbon-a",
        expense: "奖金",
        class: "收入"
      },
      {
        icon: "ion-eject",
        expense: "借入",
        class: "收入"
      },
      {
        icon: "ion-archive",
        expense: "收债",
        class: "收入"
      },
      {
        icon: "ion-briefcase",
        expense: "利息收入",
        class: "收入"
      },
      {
        icon: "ion-pricetag",
        expense: "投资回报",
        class: "收入"
      },
      {
        icon: "ion-pricetags",
        expense: "投资收益",
        class: "收入"
      },
      {
        icon: "ion-ios-filing",
        expense: "报销收入",
        class: "收入"
      },
      {
        icon: "ion-ios-box",
        expense: "退款",
        class: "收入"
      },
      {
        icon: "ion-android-send",
        expense: "其它收入",
        class: "收入"
      }
    ]
];

  //点击数据绑定函数
  $scope.choose = function(index, a){
    if(a === 0){
      $scope.data.class = $scope.subclass[0][index].class;
      $scope.data.subclass = $scope.subclass[0][index].expense;
    }
    if(a === 1){
      $scope.data.class = $scope.subclass[1][index].class;
      $scope.data.subclass = $scope.subclass[1][index].expense;
    }
  };
})

.controller('ChatsCtrl', function($scope, localStorage, $ionicPopup, $ionicTabsDelegate, $interval) {

  //定时器刷新和下拉刷新从离线存储中获得数据
  $interval(function(){
    $scope.info = localStorage.load();
  },1);
  $scope.make = function(){
    $scope.info = localStorage.load();
    //通告:下拉刷新完成
    $scope.$broadcast("scroll.refreshComplete");
  };

  //删除提示框
  $scope.showConfirm = function(index) {
    var confirmPopup = $ionicPopup.confirm({
      title: '确认删除吗？',        //警告框标题
      //template: '确认删除吗？'   //警告框内容
      okText: "确定",
      cancelText: "取消"
    });
    confirmPopup.then(function(res) {
      if(res) {
        localStorage.remove(index);
        console.log('删除成功');
      } else {
        console.log('取消删除');
      }
    });
  };

  //点击记一笔账回到记账界面
  $scope.selectTabWithIndex = function(index){
    $ionicTabsDelegate.select(index);
  };
})

.controller('AccountCtrl', function($scope, $ionicPopup, localStorage, $ionicTabsDelegate, $interval, $ionicModal){
  $scope.information = localStorage.load();

  //点击记一笔账回到记账界面
  $scope.selectTabWithIndex = function(index){
    $ionicTabsDelegate.select(index);
  };

  //报表饼状图获得数据函数
  $scope.getInfo = function(){
    $scope.information = localStorage.load();
    if($scope.information.length === 0){
      return;
    }
    $scope.plus = [];
    for(var j = 0;j < $scope.information.length; j++){
      $scope.plus.push($scope.information[j].value);
    }
    $scope.total = $scope.plus.reduce(function(a, b){
      return a * 1 + b * 1;
    });
    $scope.message = [];
    for(var i = 0;i < $scope.information.length;i++){
      $scope.arr = [];
      $scope.arr.push($scope.information[i].subclass);
      $scope.arr.push(($scope.information[i].value / $scope.total) * 100);
      //console.log($scope.information[i].subclass);
      //console.log($scope.information[i].value);
      //console.log($scope.arr);
      $scope.message.push($scope.arr);
    }
    $scope.highChartFirst.series[0].data = $scope.message;
  };

  //报表柱状图获得数据类型函数
  $scope.infoType = function(){
    $scope.information = localStorage.load();
    if($scope.information.length === 0){
      return;
    }
    $scope.arr = [];
    for(var i = 0;i < $scope.information.length;i++){
      $scope.arr.push($scope.information[i].subclass);
    }
    $scope.highChartSecond.xAxis.categories = $scope.arr;
  };

  //报表柱状图获得数据金额函数
  $scope.infoValue = function(){
    $scope.information = localStorage.load();
    if($scope.information.length === 0){
      return;
    }
    $scope.arr = [];
    for(var i = 0;i < $scope.information.length;i++){
      if($scope.information[i].class === "支出"){
        $scope.information[i].value = "-" + $scope.information[i].value;
        $scope.arr.push($scope.information[i].value);
      }else{
        $scope.arr.push($scope.information[i].value);
      }
    }
    $scope.highChartSecond.series[0].data = $scope.arr.map(function (ele, index, arr){
      return parseFloat(ele);
    });
    //console.log($scope.arr);
  };

  //警告框
  $scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: "登录成功",
      okText: "确定"
      //template: 'It might taste good'
    });
    alertPopup.then(function(res) {
      console.log("登录成功");
    });
  };

  //highCharts饼状图
  $scope.highChartFirst = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      events: {  //加载更新事件
        load: function (event) {
          var _data = this.series[0];  //把图表数据块对象静态化
          $interval(function () {      //数据图表定时判断是否更新
            if ($scope.redraw) {       //布尔型开关,为真实时更新数据,为假不更新数据
              for (var i = 0; i < $scope.highChartFirst.series[0].data.length; i++) {
                _data.addPoint($scope.highChartFirst.series[0].data[i], true, true);  //重构数据点绘制图表
              }
            }
            $scope.redraw = true;     //布尔型开关
            //console.log(_data);
          }, 1000);
        }
      }
    },
    title: {
      text: ''
    },
    tooltip: {
      headerFormat: '{series.name}<br>',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      type: 'pie',
      name: '支出收入占比',
      data :''
    }]
  };
  $scope.getInfo();

  //highCharts柱状图
  $scope.highChartSecond = {
    chart: {
      type: 'bar'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ""
    },
    credits: {
      enabled: false
    },
    series: [{
      name: '收入支出情况',
      data: ""
    }]
  };
  $scope.infoType();
  $scope.infoValue();
});


