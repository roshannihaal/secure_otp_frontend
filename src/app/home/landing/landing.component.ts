import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthTypes } from 'src/app/shared/enum/auth-types';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
    types: { value: string; label: string }[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService
    ) {}
    ngOnInit(): void {
        this.types = [
            { value: AuthTypes.AUTHENTICATOR, label: 'AUTHENTICATOR' },
            { value: AuthTypes.EMAIL, label: 'EMAIL' },
        ];
        this.check();
    }

    onSelectType(type: string): void {
        switch (type) {
            case AuthTypes.AUTHENTICATOR:
                this.router.navigate([AuthTypes.AUTHENTICATOR], { relativeTo: this.route });
                break;
            case AuthTypes.EMAIL:
                this.router.navigate([AuthTypes.EMAIL], { relativeTo: this.route });
                break;
        }
    }

    check() {
        this.apiService.init().subscribe();
    }
}
