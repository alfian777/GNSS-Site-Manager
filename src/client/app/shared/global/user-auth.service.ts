import {Injectable} from '@angular/core';
import {ConstantsService} from './constants.service';

/**
 * Service for authentication and authorisation of subjects.
 */

export class User {
    private firstName: string;
    private surname: string;
    private groups: string[];

    constructor(firstName: string, surname: string, groups?: string[]) {
        this.firstName = firstName;
        this.surname = surname;
        this.groups = groups;
    }

    public addGroup(group: string) {
        this.groups.push(group);
    }
}

@Injectable()
export class UserAuthService {
    user: User;

    constructor(private constantsService: ConstantsService) {
    }

    /**
     * Present the login form
     */
    public login(username: string, password: string) {
        // this.dialogService.showLoginDialog();
        console.log('login - ' + username + ':'+password+'; post to ', this.constantsService.getOpenAMServerURL());
    }
}
