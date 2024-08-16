import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';





@Component({
  selector: 'storybook-background1',
  templateUrl: './background1Component.html',
  styleUrls: ['./background1Component.scss']
})
export default class Background1Component {


  /**
   * Is this the principal call to action on the login-main?
   */
  @Input()
  primary = true;

  /**
   * What background color to use
   */
  @Input()
  backgroundColor?: string;


  /**
   * What background color to use
   */
  @Input()
  background?: string;

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  label = 'Page2Component';

  /**
   * Button contents
   *
   * @required
   */
  @Input()
  ACC_VERSION = '7.00.000';

  public get classes(): string[] {
    const mode = this.primary ? 'storybook-background1--primary' : 'storybook-background1--secondary';

    return ['storybook-background1', mode];
  }

  constructor() {}

  @Output() changeLang: EventEmitter<Event> = new EventEmitter();

  @Input() _translate?: any;


}

