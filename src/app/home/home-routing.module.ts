import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ActionsComponent } from './actions/actions.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'authenticator',
        component: ActionsComponent,
    },
    {
        path: 'email',
        component: ActionsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
