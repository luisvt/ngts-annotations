import * as angular from 'angular';
import 'angular-mocks';
import {testModule} from './module';
import IComponentControllerService = angular.IComponentControllerService;
import {TestComponent} from './component';
import {TestServiceThree} from './inject-and-service';

describe('@Component (with @Inject)', () => {
  let scope;
  let element;
  let testComponent: TestComponent;

  beforeEach(() => {
    angular.mock.module(testModule.name);
    inject(function ($compile, $rootScope, $componentController: IComponentControllerService) {
      scope = $rootScope.$new();
      scope.$element = {};
      element = $compile('<test-component></test-component>')(scope);
      $rootScope.$digest();
      testComponent = <TestComponent> $componentController('testComponent', scope);
    });
  });

  it('should instantiate decorated class as new service', () => {
    expect(element).toBeDefined();
    expect(testComponent).toEqual(jasmine.any(TestComponent));
    expect(testComponent.testServiceThree).toEqual(jasmine.any(TestServiceThree));
  });

  it('should assign proper $inject array to service constructor', () => {
    expect(TestComponent.$inject).toEqual(['$element', 'TestServiceThree']);
  });

  it('should execute directive on element', () => {
    expect(element.hasClass('test-component')).toBe(true);
    expect(element.html()).toBe('<span class="ng-binding">hello</span>');
    expect(element.text()).toBe('hello');
  });
});
