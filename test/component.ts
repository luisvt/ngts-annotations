import {Component, Inject} from '../src/at-angular';
import IAugmentedJQuery = angular.IAugmentedJQuery;
import {TestServiceThree} from './inject-and-service';

@Component({
  name: 'testComponent',
  template: '<span>{{$ctrl.name}}</span>'
})
export class TestComponent {
  name: string = 'hello';

  constructor(@Inject('$element') private $element: IAugmentedJQuery,
              @Inject(TestServiceThree) public testServiceThree: TestServiceThree) {
  }

  $onInit(): void {
    this.$element.addClass('test-component');
  }
}
