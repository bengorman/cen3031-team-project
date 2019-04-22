/* register the modules the application depends upon here*/
angular.module('login', []);
angular.module('tweets', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['login', 'tweets']);
