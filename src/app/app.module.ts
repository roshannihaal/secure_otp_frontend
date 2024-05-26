import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { SharedModule } from './shared/shared.module';
import { provideToastr } from 'ngx-toastr';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
    providers: [
        httpInterceptorProviders,
        provideToastr({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            progressBar: true,
        }),
        provideAnimations(),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
