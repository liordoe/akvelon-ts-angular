"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var ModalService = (function () {
    function ModalService() {
        this.modals = [];
    }
    ModalService.prototype.add = function (modal) {
        this.modals.push(modal);
    };
    ModalService.prototype.remove = function (id) {
        var modalToRemove = _.findWhere(this.modals, { id: id });
        this.modals = _.without(this.modals, modalToRemove);
    };
    ModalService.prototype.open = function (id) {
        var modal = _.findWhere(this.modals, { id: id });
        modal.open();
    };
    ModalService.prototype.close = function (id) {
        var modal = _.find(this.modals, { id: id });
        modal.close();
    };
    return ModalService;
}());
exports.ModalService = ModalService;
