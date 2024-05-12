import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit {
    @Input() data: {
        message: string;
        transactionId: string;
        qrcode?: string;
    };

    otpForm: FormGroup;
    verifyMessage: string;
    cancelMessage: string;
    resendMessage: string;
    waitTime: number;
    waitTimeMessage: string;
    timer: any;
    canResend: boolean;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.verifyMessage = 'Verify';
        this.cancelMessage = 'Cancel';
        if (this.data.qrcode) {
            this.resendMessage = 'Regenerate QR Code';
        } else {
            this.resendMessage = 'Resend OTP';
        }
        this.setupOtpForm();
        this.initializeTimer();
    }

    setupOtpForm(): void {
        this.otpForm = new FormGroup({
            otp: new FormControl(null, [
                Validators.required,
                Validators.pattern('^[0-9]*$'),
                Validators.minLength(8),
            ]),
        });
    }

    initializeTimer() {
        this.canResend = false;
        this.resetWaitTimer();
        this.tick();
        this.timer = setInterval(this.tick.bind(this), 1000);
    }
    resetWaitTimer() {
        this.waitTime = environment.OTP_WAIT_TIME;
    }

    tick() {
        const min: string = String(Math.trunc(this.waitTime / 60)).padStart(2, '0');
        const sec: string = String(this.waitTime % 60).padStart(2, '0');

        if (this.data.qrcode) {
            this.waitTimeMessage = `Regenerate QR Code in ${min}:${sec}`;
        } else {
            this.waitTimeMessage = `Resend OTP in ${min}:${sec}`;
        }

        if (this.waitTime === 0) {
            this.canResend = true;
            clearInterval(this.timer);
        }

        this.waitTime--;
    }

    onCancel() {
        this.router.navigate(['']);
    }

    onResend() {
        this.initializeTimer();
    }
}
