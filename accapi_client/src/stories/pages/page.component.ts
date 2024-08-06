import { Component } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'storybook-login-main',
  templateUrl: './page.component.html',
  styleUrls: ['./page.css'],
})
export default class PageComponent {
  user: User | null = null;

  doLogout() {
    this.user = null;
  }

  doLogin() {
    this.user = { name: 'Jane Doe' };
  }

  doCreateAccount() {
    this.user = { name: 'Jane Doe' };
  }
}
