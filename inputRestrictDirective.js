/*
 * @author amal-pn https://github.com/amal-pn/

 * Directive for restricting the input values typed in to an input element based on a REGEX pattern.
 * Pass the REGEX as an argument for the attribute 'restrict-pattern' of the respective input element
 * */

var app = angular.module('inputRestrict', []);
app.controller('AppCtrl', function ($scope) {

});
app.directive('restrictPattern', function ($log) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                let regex = null, regexInvalid = false;
                try {
                    regex = new RegExp(attr.restrictPattern);
                }
                catch (e) {
                    regexInvalid = true;
                    $log.warn('Input Restrict Directive: Invalid Regex Pattern!! ');
                }
                //In case of an empty/invalid view value or if it passes the regex test, return the view value
                if (regexInvalid || viewValue === undefined || viewValue === null || viewValue === '' || regex.test(viewValue))  
                    return viewValue;
                else { //if not valid view value, override it using the model value (if that's also invalid use an empty string )
                    let overrideValue = (regex.test(ctrl.$modelValue) ? ctrl.$modelValue : '');
                    element.val(overrideValue);
                    ctrl.$setViewValue(overrideValue);
                    ctrl.$render();
                    return overrideValue;
                }
            });
        }
    };
});
