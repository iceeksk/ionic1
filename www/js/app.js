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

  .controller("ToDoCtrl", function ($scope, $ionicModal, $timeout) {

    if (!angular.isUndefined(window.localStorage['tasks'])) {
      $scope.tasks = JSON.parse(window.localStorage['tasks']);
    } else {
      $scope.tasks = [
        {
          title: "Learn Ionic",
          description: "читать доки, делать таски",
          done: false
        },
        {
          title: "Learn Ionic 2",
          description: "читать доки, делать таски",
          done: false
        },
        {
          title: "Learn Angular 1.x",
          description: "читать доки, делать таски",
          done: false
        },
        {
          title: "Learn AngularJS",
          description: "читать доки, делать таски",
          done: false
        },
        {
          title: "Learn Cordova",
          description: "читать доки, делать таски",
          done: false
        }
      ];
    }

    $ionicModal.fromTemplateUrl('templates/task.html', function (modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    $scope.currentTaskId = -1;

    $scope.addNewTask = function () {
      $scope.taskModal.show();
      $scope.activeTask = {
        title: "",
        description: "",
        done: false
      };
      $scope.currentTaskId = -1;
    };

    $scope.closeAddTask = function () {
      $scope.taskModal.hide();
    };

    $scope.openTask = function (id) {
      var task = $scope.tasks[id];
      $scope.currentTaskId = id;
      $scope.activeTask = {
        title: task.title,
        description: task.description,
        done: task.done
      };
      $scope.taskModal.show();
    };

    $scope.dellTask = function (id) {
      $scope.tasks.splice(id, 1);
      savaItemsToStorage();
    };

    $scope.submitTask = function (task) {
      if ($scope.currentTaskId == -1) {
        $scope.tasks.push({
          title: task.title,
          description: task.description,
          done: task.done
        })
      } else {
        var id = $scope.currentTaskId;
        $scope.tasks[id].title = task.title;
        $scope.tasks[id].description = task.description;
        $scope.tasks[id].done = task.done;
      }
      savaItemsToStorage();
      $scope.taskModal.hide();
    };

    $scope.save = function () {
      console.log("dadada");
      $timeout(function () {
        savaItemsToStorage();
      });
    };

    function savaItemsToStorage() {
      window.localStorage['tasks'] = angular.toJson($scope.tasks);
    }


  });
