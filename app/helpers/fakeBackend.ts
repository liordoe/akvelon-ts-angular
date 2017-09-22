import {
    Http,
    BaseRequestOptions,
    Response,
    ResponseOptions,
    RequestMethod
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import {
    User
} from '../models/user';

export let fakeBackendProvider = {
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {

        backend.connections.subscribe((connection: MockConnection) => {
            setTimeout(() => {

                // get users
                if (connection.request.url.endsWith('/api/users') &&
                    connection.request.method === RequestMethod.Get) {

                    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

                    let response: Response = new Response(new ResponseOptions({
                        status: 200,
                        body: users
                    }));

                    connection.mockRespond(response);
                }

                // create user
                if (connection.request.url.endsWith('/api/users') &&
                    connection.request.method === RequestMethod.Post) {

                    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

                    let newUser = JSON.parse(connection.request.getBody());

                    let duplicateUser = users.find(user => user.username === newUser.username);

                    if (duplicateUser) {
                        let error = new Error('Username "' + newUser.username + '" is already taken');
                        return connection.mockError(error);
                    }

                    // else
                    newUser.id = (users.length ? Math.max.apply(null, users.map(user => user.id)) : 0) + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    let response: Response = new Response(new ResponseOptions({
                        status: 200
                    }));

                    connection.mockRespond(response);
                }

                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === RequestMethod.Get) {

                    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

                    let urlParts: string[] = connection.request.url.split('/');
                    let id: number = parseInt(urlParts[urlParts.length - 1]);

                    let found: User = users.find(user => user.id === id);

                    let response: Response = new Response(new ResponseOptions({
                        status: 200,
                        body: found
                    }));

                    connection.mockRespond(response);
                }

                // delete user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === RequestMethod.Delete) {

                    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

                    let urlParts: string[] = connection.request.url.split('/');
                    let id: number = parseInt(urlParts.pop());
                    let index: number = users.findIndex(user => user.id === id);

                    users.splice(index, 1);
                    localStorage.setItem('users', JSON.stringify(users));

                    let response: Response = new Response(new ResponseOptions({
                        status: 200
                    }));
                    connection.mockRespond(response);
                }

                // update user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === RequestMethod.Put) {

                    let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

                    let urlParts: string[] = connection.request.url.split('/');
                    let id: number = parseInt(urlParts.pop());
                    let index: number = users.findIndex(user => user.id === id);

                    let userData = JSON.parse(connection.request.getBody());

                    Object.assign(users[index], userData);

                    localStorage.setItem('users', JSON.stringify(users));

                    let response: Response = new Response(new ResponseOptions({
                        status: 200
                    }));
                    connection.mockRespond(response);
                }

            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};