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
var user_service_1 = require("../../services/user.service");
var modal_service_1 = require("../../services/modals/modal.service");
var ListComponent = (function () {
    function ListComponent(userService, modalService) {
        this.userService = userService;
        this.modalService = modalService;
        this.users = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    ListComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { return _this.users = users; });
    };
    ListComponent.prototype.showModal = function (modalId, data, event) {
        if (event)
            event.stopPropagation();
        this.error = null;
        this.modalService.open(modalId);
        this.modalData = data;
        this.openedModalName = modalId;
    };
    ListComponent.prototype.closeModal = function (modalId) {
        this.modalService.close(modalId);
        this.openedModalName = null;
    };
    ListComponent.prototype.createNewUser = function (formData) {
        var _this = this;
        this.error = null;
        this.userService.create(formData).subscribe(function (res) {
            _this.loadAllUsers();
            _this.modalService.close(_this.openedModalName);
        }, function (err) {
            _this.error = err;
        });
    };
    ListComponent.prototype.deleteUser = function (userId) {
        var _this = this;
        var id = parseInt(this.modalData) || userId;
        this.userService.delete(id).subscribe(function () {
            var ind = _this.users.findIndex(function (user) { return user.id === id; });
            _this.users.splice(ind, 1);
            _this.modalData = null;
        });
        this.modalService.close(this.openedModalName);
    };
    return ListComponent;
}());
ListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'list.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        modal_service_1.ModalService])
], ListComponent);
exports.ListComponent = ListComponent;
