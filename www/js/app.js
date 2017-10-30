angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-datepicker', 'highcharts-ng'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider ,ionicDatePickerProvider) {
  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  //默认路由
  $urlRouterProvider.otherwise('/tab/dash');

  //日期控件默认全局配置
  var datePickerObj = {
    inputDate: new Date(),  //传给组件的日期对象
    //from: new Date(2015, 1, 1), //起始日期
    //to: new Date(),  //截止日期
    setLabel: '确定',  //set按钮
    todayLabel: '今天', //today按钮
    closeLabel: '关闭', //close按钮
    mondayFirst: true, //是否将星期一作为一周的开始
    weeksList: ["日", "一", "二", "三", "四", "五", "六"],  //周列表数组
    monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],  //月列表数组
    showTodayButton: true,  //是否显示今天today按钮
    dateFormat: 'yyyy-MMMM-dd',  //日期格式
    //disabledDates: [], //禁用日期 无法选择
    //disableWeekdays: [], //禁用周 无法选择
    templateType: 'popup', //以什么形式弹出
    closeOnSelect: false //弹出后是否有关闭它的选项
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);

  //android和ios选项卡相同布局配置
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

});
