import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fakeBackend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { ListComponent, SingleComponent, HomeComponent, HeaderComponent } from './components/index';
import { ModalComponent } from './helpers/modals/modal.component';
import { routing }        from './app.routing';

import { UserService } from './services/user.service';
import { ModalService } from './services/modals/modal.service';

enableProdMode();

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ListComponent,
        SingleComponent,
        ModalComponent
    ],
    providers: [
        UserService,
        ModalService,
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }