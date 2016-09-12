import angular from 'angular';
import router from 'angular-ui-router';
import components from './components';
import services from './services';
import md from 'angular-material';
import 'angular-material/angular-material.css';

const app = angular.module('jobHunter', [router, components, services, md]); 

app.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .backgroundPalette('deep-purple')
    .warnPalette('red');
}]);

export default app;