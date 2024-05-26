import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
    pageNotFound: string;
    fourOfour: number;
    returnHome: string;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.pageNotFound = 'PAGE NOT FOUND';
        this.fourOfour = 404;
        this.returnHome = 'RETURN HOME';
    }

    onReturnHome(): void {
        this.router.navigate(['']);
    }
}
