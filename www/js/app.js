angular.module('ToDo', ['ionic'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

.controller("ToDoCtrl", function ($scope, $ionicModal) {
  $scope.tasks = [
      {
        "title": "Learn Ionic",
        "description": "читать доки, делать таски",
        "done": "false"
      },
      {
        "title": "Learn Ionic 2",
        "description": "читать доки, делать таски",
        "done": "false"
      },
      {
        "title": "Learn Angular 1.x",
        "description": "читать доки, делать таски",
        "done": "false"
      },
      {
        "title": "Learn AngularJS",
        "description": "читать доки, делать таски",
        "done": "false"
      },
      {
        "title": "Learn Cordova",
        "description": "читать доки, делать таски",
        "done": "false"
      }
    ];

  $ionicModal.fromTemplateUrl('templates/task.html', function (modal) {
    $scope.taskModal = modal;
  },{
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.openAddTask = function () {
    $scope.taskModal.show();
  }

  $scope.closeAddTask = function () {
    $scope.taskModal.hide();
  }

});
