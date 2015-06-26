
module app {

    'use strict';

    const directiveProperties: string[] = [
        'compile',
        'controller',
        'controllerAs',
        'bindToController',
        'link',
        'name',
        'priority',
        'replace',
        'require',
        'restrict',
        'scope',
        'template',
        'templateUrl',
        'terminal',
        'transclude'
    ];

    /* tslint:disable:no-any */
    export interface IClassAnnotationDecorator {
        (target: any): void;
    }

    function instantiate(moduleName: string, name: string, mode: string): IClassAnnotationDecorator {
        return (target: any): void => {
            angular.module(moduleName)[mode](name, target);
        };
    }

    export function attachInjects(target: any, ...args: any[]): any {
        (target.$inject || []).forEach((item: string, index: number) => {
            target.prototype['$_' + item] = args[index];
        });
        return target;
    }

    export function inject(...args: string[]): IClassAnnotationDecorator {
        return (target: any): void => {
            target.$inject = args;
        };
    }

    export function service(moduleName: string, serviceName: string): IClassAnnotationDecorator {
        return instantiate(moduleName, serviceName, 'service');
    }

    export function controller(moduleName: string, ctrlName: string): IClassAnnotationDecorator {
        return instantiate(moduleName, ctrlName, 'controller');
    }

    export function directive(moduleName: string, directiveName: string): IClassAnnotationDecorator {
        return (target: any): void => {
            var config: angular.IDirective;
            if (target.controller) {
                controller(moduleName, target.controller.split(' ').shift())(target);
            }
            config = directiveProperties.reduce((
                config: angular.IDirective,
                property: string
            ) => {
                return angular.isDefined(target[property]) ?
                    angular.extend(config, {[property]: target[property]}) : config;
            }, {controller: target, scope: Boolean(target.templateUrl)});

            angular.module(moduleName).directive(directiveName, () => (config));
        };
    }

    export function classFactory(moduleName: string, className: string): IClassAnnotationDecorator {
        return (target: any): void => {
            angular.module(moduleName).factory(className,
            /* istanbul ignore next */(...args: any[]) => attachInjects(target, ...args));
        };
    }
    /* tslint:enable:no-any */

}
