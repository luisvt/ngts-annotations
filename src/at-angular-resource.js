"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
require('angular-resource');
var at_angular_1 = require('./at-angular');
function combineResource(instance, model) {
    angular.extend(instance, new instance.$_Resource(model));
}
/* istanbul ignore next */
var BaseResource = (function () {
    function BaseResource(model) {
        combineResource(this, model);
    }
    return BaseResource;
}());
exports.BaseResource = BaseResource;
/* istanbul ignore next */
var ResourceWithUpdate = (function (_super) {
    __extends(ResourceWithUpdate, _super);
    function ResourceWithUpdate(model) {
        _super.call(this, model);
    }
    return ResourceWithUpdate;
}(BaseResource));
exports.ResourceWithUpdate = ResourceWithUpdate;
function Resource() {
    return function (target) {
        function resourceClassFactory($resource) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var newResource = $resource(target.url, target.params, target.actions, target.options);
            return at_angular_1.attachInjects.apply(void 0, [angular.extend(newResource, angular.extend(target, newResource, {
                prototype: angular.extend(newResource.prototype, angular.extend(target.prototype, {
                    /* tslint:disable:variable-name */
                    $_Resource: newResource
                }))
            }))].concat(args));
        }
        resourceClassFactory.$inject = (['$resource']).concat(target.$inject /* istanbul ignore next */ || []);
        target.__$$declare = function (module) {
            module.factory(target.name, resourceClassFactory);
        };
    };
}
exports.Resource = Resource;
//# sourceMappingURL=at-angular-resource.js.map