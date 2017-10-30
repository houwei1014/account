angular.module('starter.services', [])
  .factory("localStorage", function(){
    var data = [];
    var key = "__MONEY__";
    //加载函数
    var loadData = function(){
      var read = localStorage[key];
      if(!angular.isString(read) || read == "undefined"){
        data = [];
      }else{
        data = angular.fromJson(read);
      }
      return data;
    };
    //保存函数
    var saveData = function(arr){
      loadData();
      data.push(arr);
      localStorage[key] = angular.toJson(data);
    };
    //删除函数
    var removeDate = function (index) {
      loadData();
      data.splice(index, 1);
      localStorage[key] = angular.toJson(data);
    };
    return {
      load: loadData,
      save: saveData,
      remove: removeDate
    };
  });

