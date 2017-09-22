import {
    Component,
    OnInit
} from '@angular/core';

import {
    User
} from '../../models/user';
import {
    UserService
} from '../../services/user.service';
import {
    ModalService
} from '../../services/modals/modal.service';

@Component({
    moduleId: module.id,
    templateUrl: 'list.html'
})

export class ListComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    modalData: any;
    openedModalName: string;
    error: Error;

    constructor(private userService: UserService,
        private modalService: ModalService) {}

    ngOnInit() {
        this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => this.users = users);
    }

    showModal(modalId: string, data: any, event: any) {
        if (event) event.stopPropagation();
        this.error = null;
        this.modalService.open(modalId);
        this.modalData = data;
        this.openedModalName = modalId;
    }

    closeModal(modalId: string) {
        this.modalService.close(modalId);
        this.openedModalName = null;
    }

    createNewUser(formData: User) {
        this.error = null;
        this.userService.create(formData).subscribe(res => {
            this.loadAllUsers();
            this.modalService.close(this.openedModalName);
        }, err => {
            this.error = err;
        });
    }

    deleteUser(userId: number) {
        let id: number = parseInt(this.modalData) || userId;
        this.userService.delete(id).subscribe(() => {
            let ind = this.users.findIndex(user => user.id === id);
            this.users.splice(ind, 1);
            this.modalData = null;
        });
        this.modalService.close(this.openedModalName);
    }
}