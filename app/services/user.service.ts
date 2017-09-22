import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../models/user';

import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/api/users').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user).map((response: Response) => response.json());
    }

    update(id: number, data: object) {
        return this.http.put('/api/users/' + id, data).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id).map((response: Response) => response.json());
    }
}