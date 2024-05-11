import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-actions',
    templateUrl: './actions.component.html',
    styleUrls: ['./actions.component.css'],
})
export class ActionsComponent implements OnInit {
    currAuth: string;
    dynamicForm: FormGroup;
    generateMessage: string;
    backMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currAuth = this.route.snapshot.routeConfig.path;
        this.setupDynamicForm();
        this.backMessage = 'Back';
    }

    setupDynamicForm(): void {
        this.dynamicForm = new FormGroup({
            type: new FormControl(this.currAuth),
        });
        if (this.currAuth === 'email') {
            this.dynamicForm.addControl(
                'id',
                new FormControl(null, [Validators.required, Validators.email])
            );
            this.generateMessage = 'Generate OTP';
        } else {
            this.generateMessage = 'Generate QR Code';
        }
    }

    onBack(): void {
        this.router.navigate(['']);
    }
}
