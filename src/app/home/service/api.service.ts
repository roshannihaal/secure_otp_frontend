import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTE } from 'src/app/shared/constants';
@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    init() {
        return this.http.get(API_ROUTE.INIT);
    }

    generateOtp(body: { type: string; id?: string }) {
        return this.http.post(API_ROUTE.GENERATE_OTP, body);
    }

    verifyOtp(body: { type: string; id?: string; otp: string }) {
        return this.http.post(API_ROUTE.VERIFY_OTP, body);
    }

    resendOtp(body: { type: string; transactionId: string }) {
        return this.http.post(API_ROUTE.RESEND_OTP, body);
    }
}
