import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import {
    ActivatedRoute
} from '@angular/router';

import {
    User
} from '../../models/user';
import {
    UserService
} from '../../services/user.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'single.html'
})

export class SingleComponent implements OnInit {
    private sub: any;
    private user: User;
    private showPassword: boolean = false;
    private loadedCopy: User;

    constructor(private route: ActivatedRoute,
        private userService: UserService) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.loadUser(+params['id']);
        });
    }

    private loadUser(id: number) {
        this.userService.getById(id).subscribe(user => {
            this.user = user;
            this.loadedCopy = _.clone(user);
        });
    }

    switchPass() {
        this.showPassword = !this.showPassword;
    }

    updateUser(user: User) {
        this.userService.update(this.user.id, user);
    }

    discardUpdate() {
        this.user = _.clone(this.loadedCopy);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}