"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var testing_1 = require("@angular/http/testing");
exports.fakeBackendProvider = {
    provide: http_1.Http,
    useFactory: function (backend, options) {
        backend.connections.subscribe(function (connection) {
            setTimeout(function () {
                // get users
                if (connection.request.url.endsWith('/api/users') &&
                    connection.request.method === http_1.RequestMethod.Get) {
                    var users = JSON.parse(localStorage.getItem('users')) || [];
                    var response = new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: users
                    }));
                    connection.mockRespond(response);
                }
                // create user
                if (connection.request.url.endsWith('/api/users') &&
                    connection.request.method === http_1.RequestMethod.Post) {
                    var users = JSON.parse(localStorage.getItem('users')) || [];
                    var newUser_1 = JSON.parse(connection.request.getBody());
                    var duplicateUser = users.find(function (user) { return user.username === newUser_1.username; });
                    if (duplicateUser) {
                        var error = new Error('Username "' + newUser_1.username + '" is already taken');
                        return connection.mockError(error);
                    }
                    // else
                    newUser_1.id = (users.length ? Math.max.apply(null, users.map(function (user) { return user.id; })) : 0) + 1;
                    users.push(newUser_1);
                    localStorage.setItem('users', JSON.stringify(users));
                    var response = new http_1.Response(new http_1.ResponseOptions({
                        status: 200
                    }));
                    connection.mockRespond(response);
                }
                // get user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === http_1.RequestMethod.Get) {
                    var users = JSON.parse(localStorage.getItem('users')) || [];
                    var urlParts = connection.request.url.split('/');
                    var id_1 = parseInt(urlParts[urlParts.length - 1]);
                    var found = users.find(function (user) { return user.id === id_1; });
                    var response = new http_1.Response(new http_1.ResponseOptions({
                        status: 200,
                        body: found
                    }));
                    connection.mockRespond(response);
                }
                // delete user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === http_1.RequestMethod.Delete) {
                    var users = JSON.parse(localStorage.getItem('users')) || [];
                    var urlParts = connection.request.url.split('/');
                    var id_2 = parseInt(urlParts.pop());
                    var index = users.findIndex(function (user) { return user.id === id_2; });
                    users.splice(index, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    var response = new http_1.Response(new http_1.ResponseOptions({
                        status: 200
                    }));
                    connection.mockRespond(response);
                }
                // update user by id
                if (connection.request.url.match(/\/api\/users\/\d+$/) &&
                    connection.request.method === http_1.RequestMethod.Put) {
                    var users = JSON.parse(localStorage.getItem('users')) || [];
                    var urlParts = connection.request.url.split('/');
                    var id_3 = parseInt(urlParts.pop());
                    var index = users.findIndex(function (user) { return user.id === id_3; });
                    var userData = JSON.parse(connection.request.getBody());
                    Object.assign(users[index], userData);
                    localStorage.setItem('users', JSON.stringify(users));
                    var response = new http_1.Response(new http_1.ResponseOptions({
                        status: 200
                    }));
                    connection.mockRespond(response);
                }
            }, 500);
        });
        return new http_1.Http(backend, options);
    },
    deps: [testing_1.MockBackend, http_1.BaseRequestOptions]
};
