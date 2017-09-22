import { Routes, RouterModule } from '@angular/router';

import { ListComponent, SingleComponent, HomeComponent } from './components/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: ListComponent },
    { path: 'users/:id', component: SingleComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);