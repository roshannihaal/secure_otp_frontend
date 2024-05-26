import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../service/api.service';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css'],
})
export class VerificationComponent implements OnInit, OnChanges {
    @Input() data: {
        message: string;
        transactionId: string;
        qrcode: string;
        new: boolean;
    };
    @Output() resend = new EventEmitter<boolean>();

    otpForm: FormGroup;
    verifyMessage: string;
    cancelMessage: string;
    resendMessage: string;
    waitTime: number;
    waitTimeMessage: string;
    timer: any;
    canResend: boolean;
    currAuth: string;
    responseData: {
        message: string;
        data: {
            transactionId: string;
        };
    };
    readyForFinal: boolean;
    qrcodeMessage: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.currAuth = this.route.snapshot.routeConfig.path;
        this.verifyMessage = 'Verify';
        this.cancelMessage = 'Cancel';
        if (this.data.qrcode) {
            this.resendMessage = 'Regenerate QR Code';
            this.qrcodeMessage = 'Scan The QRCode with your Authenticator App and enter the OTP';
        } else {
            this.resendMessage = 'Resend OTP';
        }
        this.readyForFinal = false;
        this.setupOtpForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
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
        this.resend.emit(true);
    }

    onVerify() {
        const body = {
            type: this.currAuth,
            transactionId: this.data.transactionId,
            otp: this.otpForm.value.otp,
        };
        this.sendVerifyRequest(body);
    }

    sendVerifyRequest(body: { type: string; transactionId: string; otp: string }) {
        this.apiService
            .verifyOtp(body)
            .subscribe((res: { message: string; data: { transactionId: string } }) => {
                this.responseData = res;
                this.readyForFinal = true;
            });
    }
}
