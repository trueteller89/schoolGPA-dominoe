/**
 * Created by Regrem PC2 on 25.01.2017.
 */
'use strict';

angular.module('myApp.rating', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rating', {
            templateUrl: 'rating/rating.html',
            controller: 'ratingController'
        });
    }])

    .controller('ratingController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $http.get("students.json").then(function (res) {
            //get grades and students from json file
            $scope.grades = res.data.grades;
            $scope.currentGrade = $scope.grades[0]['gradename'];
            $scope.currentStudents = $scope.grades[0]['students'];
            getSumAvg();
        });
        $scope.newGrade = {
            //init new grade
            gradename: "",
            students: []
        };
        $scope.newStudent = {
            //init new student
            name: "",
            gpa: ""
        };
        var getSumAvg = function () {
            //count average GPA. summary counts with forEach and reduce, quantity of students - simply with adding +1 at each iteration
            var quantity = 0;
            var totalSum = 0;
            $scope.grades.forEach(function (item, i) {
                totalSum = totalSum + item['students'].reduce(function (summary, current) {
                        quantity++;
                        return summary + current.gpa;
                    }, 0);
            });
            if (quantity) {
                $scope.sumAvg = Math.round((totalSum / quantity) * 100) / 100;
            }
            else {
                $scope.sumAvg = 0;
            }
            totalSum = 0;
            quantity = 0;
        };
        $scope.addStudent = function () {
            //add student - not allowed to add empty student, then recount average gpa
            if ($scope.newStudent.name && $scope.newStudent.gpa) {
                $scope.currentStudents[$scope.currentStudents.length] = $scope.newStudent;
                $scope.grades.forEach(function (item) {
                    if (item['gradename'] == $scope.currentGrade) {
                        item['students'] = $scope.currentStudents;
                    }
                });
            }
            else {
                alert("not correct data. gpa is a number from 0 to 5");
            }
            ;
            $scope.newStudent = {
                name: "",
                gpa: ""
            };
            getSumAvg();
        };
        $scope.removeStudent = function ($index) {
            //remove student by index , then recount average gpa
            $scope.currentStudents.splice($index, 1);
            $scope.grades.forEach(function (item) {
                if (item['gradename'] == $scope.currentGrade) {
                    item['students'] = $scope.currentStudents;
                }
            });
            getSumAvg();
        };
        $scope.showGrade = function () {
            //show grade - simply change $scope.currentStudents
            $scope.grades.forEach(function (item, i) {
                if (item.gradename == $scope.currentGrade) {
                    $scope.currentStudents = item['students'];
                }
            })
        };
        $scope.addGrade = function () {
            //add new grade - not allowed to add grade with equal name
            function isEqual(classname) {
                if (classname.gradename === $scope.newGrade.gradename) return true
            }

            if ($scope.grades.some(isEqual)) {
                alert("this name is taken")
            }
            else {
                $scope.grades[$scope.grades.length] = $scope.newGrade;
            }
            $scope.newGrade = {
                gradename: "",
                students: []
            }
        };
        $scope.removeGrade = function () {
            //remove grade (only in not emply array) - find it by name, remember index (sorry not for using indexof)
            if ( $scope.grades.length){
            var findGrade=0;
            $scope.grades.forEach(function (grade, i) {
                if (grade["gradename"] == $scope.currentGrade) {
                    findGrade=i;
                }
            });
            $scope.grades.splice(findGrade, 1);}
            if ( $scope.grades.length){
                $scope.currentGrade = $scope.grades[0]['gradename'];
                $scope.currentStudents = $scope.grades[0]['students'];
            }
            else { $scope.currentGrade = "no grades";
                $scope.currentStudents = [];}
        }
        //sorry, no infinite scrolling
    }])
;