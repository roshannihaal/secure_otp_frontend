import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
    types: { value: string; label: string }[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.types = [
            { value: 'authenticator', label: 'AUTHENTICATOR' },
            { value: 'email', label: 'EMAIL' },
        ];
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
}
