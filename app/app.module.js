"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// used to create fake backend
var fakeBackend_1 = require("./helpers/fakeBackend");
var testing_1 = require("@angular/http/testing");
var http_2 = require("@angular/http");
var app_component_1 = require("./app.component");
var index_1 = require("./components/index");
var modal_component_1 = require("./helpers/modals/modal.component");
var app_routing_1 = require("./app.routing");
var user_service_1 = require("./services/user.service");
var modal_service_1 = require("./services/modals/modal.service");
core_1.enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule,
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent,
            index_1.HeaderComponent,
            index_1.HomeComponent,
            index_1.ListComponent,
            index_1.SingleComponent,
            modal_component_1.ModalComponent
        ],
        providers: [
            user_service_1.UserService,
            modal_service_1.ModalService,
            fakeBackend_1.fakeBackendProvider,
            testing_1.MockBackend,
            http_2.BaseRequestOptions
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
