/* register the modules the application depends upon here*/
angular.module('listings', []);
angular.module('login', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['login']);