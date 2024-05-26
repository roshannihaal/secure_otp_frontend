import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { IGenerate } from 'src/app/shared/interface/igenerate';
import { ISendBody } from 'src/app/shared/interface/isend';
import { IResendBody } from 'src/app/shared/interface/iresend';
import { AuthTypes } from 'src/app/shared/enum/auth-types';

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
    responseData: IGenerate;
    qrcodeMessage: string;
    nextMessage: string;
    readyForVerification: boolean;
    newTransaction: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.currAuth = this.route.snapshot.routeConfig.path;
        this.setupDynamicForm();
        this.backMessage = 'Back';
        this.qrcodeMessage = 'Scan The QRCode with your Authenticator App and click Next';
        this.nextMessage = 'Next';
        this.readyForVerification = false;
    }

    setupDynamicForm(): void {
        this.dynamicForm = new FormGroup({
            type: new FormControl(this.currAuth),
        });
        if (this.currAuth === AuthTypes.EMAIL) {
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

    onSubmit(): void {
        const value: ISendBody = this.dynamicForm.value;
        this.sendRequest(value);
    }

    sendRequest(body: ISendBody): void {
        this.apiService.generateOtp(body).subscribe((res: IGenerate) => {
            this.responseData = res;
            this.newTransaction = true;
            if (this.currAuth === AuthTypes.EMAIL) {
                this.onNext();
            }
        });
    }

    resendRequest(body: IResendBody): void {
        this.apiService.resendOtp(body).subscribe((res: IGenerate) => {
            this.responseData = res;
            this.newTransaction = false;
        });
    }

    onNext(): void {
        this.readyForVerification = true;
    }

    onResend(): void {
        const body: IResendBody = {
            type: this.currAuth,
            transactionId: this.responseData.data.transactionId,
        };
        this.resendRequest(body);
    }
}
