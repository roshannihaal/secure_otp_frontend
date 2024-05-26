import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVerify } from 'src/app/shared/interface/iverify';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-final',
    templateUrl: './final.component.html',
    styleUrls: ['./final.component.css'],
})
export class FinalComponent implements OnInit {
    @Input() data: IVerify;

    timer: any;
    waitTime: number;
    redirectMessage: string;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.initializeTimer();
    }

    initializeTimer() {
        this.waitTime = environment.REDIRECT_WAIT_TIME;
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    tick() {
        this.redirectMessage = `Redirecting in ${this.waitTime} seconds...`;

        if (this.waitTime === 0) {
            clearInterval(this.timer);
            this.router.navigate(['']);
        }

        this.waitTime--;
    }
}
