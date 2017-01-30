import { Component } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import {UserAuthService} from '../shared/global/user-auth.service';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
    private username: string;
    private password: string;

    constructor(private userAuthService: UserAuthService) {
        console.log('LoginComponent');
    }

    login() {
        console.log('username: '+this.username);
        console.log('password: '+this.password);

        this.userAuthService.login(this.username, this.password);
    }
}
