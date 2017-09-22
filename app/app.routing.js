"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_1 = require("./components/index");
var appRoutes = [
    { path: '', component: index_1.HomeComponent },
    { path: 'users', component: index_1.ListComponent },
    { path: 'users/:id', component: index_1.SingleComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
