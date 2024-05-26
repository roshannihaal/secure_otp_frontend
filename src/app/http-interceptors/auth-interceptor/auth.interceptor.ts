import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private requests: HttpRequest<unknown>[] = [];
    constructor(
        private loaderService: LoaderService,
        private toastr: ToastrService
    ) {}
    addRequest(req: HttpRequest<unknown>) {
        this.requests.push(req);
        this.loaderService.startLoading();
    }

    removeRequest(req: HttpRequest<unknown>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }

        if (!this.requests.length) {
            this.loaderService.stopLoading();
        }
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = request.clone({
            url: environment.BACKEND_URL + request.url,
        });

        this.addRequest(request);
        return new Observable(observer => {
            const subscription = next.handle(request).subscribe({
                next: event => {
                    if (event instanceof HttpResponse) {
                        this.toastr.success(`Status code: ${event.status}`, event.body.message);
                        observer.next(event);
                    }
                },
                error: (err: {
                    error: { message: string; statusCode: number };
                    status: number;
                }) => {
                    this.toastr.error(`Status code: ${err.status}`, err.error.message);
                    observer.error(err);
                },
                complete: () => {
                    this.removeRequest(request);
                    observer.complete();
                },
            });
            return () => {
                this.removeRequest(request);
                subscription.unsubscribe();
            };
        });
    }
}
