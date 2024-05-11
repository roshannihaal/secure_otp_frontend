import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';

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
            { value: 'authenticator', label: 'AUTHENTICATOR' },
            { value: 'email', label: 'EMAIL' },
        ];
        this.check();
    }

    onSelectType(type: string): void {
        switch (type) {
            case 'authenticator':
                this.router.navigate(['authenticator'], { relativeTo: this.route });
                break;
            case 'email':
                this.router.navigate(['email'], { relativeTo: this.route });
                break;
        }
    }

    check() {
        this.apiService.init().subscribe();
    }
}
