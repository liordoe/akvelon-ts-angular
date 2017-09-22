"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var _ = require("underscore");
var SingleComponent = (function () {
    function SingleComponent(route, userService) {
        this.route = route;
        this.userService = userService;
        this.showPassword = false;
    }
    SingleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.loadUser(+params['id']);
        });
    };
    SingleComponent.prototype.loadUser = function (id) {
        var _this = this;
        this.userService.getById(id).subscribe(function (user) {
            _this.user = user;
            _this.loadedCopy = _.clone(user);
        });
    };
    SingleComponent.prototype.switchPass = function () {
        this.showPassword = !this.showPassword;
    };
    SingleComponent.prototype.updateUser = function (user) {
        this.userService.update(this.user.id, user);
    };
    SingleComponent.prototype.discardUpdate = function () {
        this.user = _.clone(this.loadedCopy);
    };
    SingleComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    return SingleComponent;
}());
SingleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'single.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        user_service_1.UserService])
], SingleComponent);
exports.SingleComponent = SingleComponent;
