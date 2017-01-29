import {Injectable} from '@angular/core';
import {DialogService} from './dialog.service';
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

    constructor(private dialogService: DialogService) {
        // comment
    }

    /**
     * Present the login form
     */
    public login() {
        this.dialogService.showLoginDialog();
    }
}
