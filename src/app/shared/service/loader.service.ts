import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
    private isLoading = false;

    startLoading() {
        this.isLoading = true;
    }

    stopLoading() {
        this.isLoading = false;
    }

    getLoader() {
        return this.isLoading;
    }
}
