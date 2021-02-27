import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const FIREBASE_API_KEY = "";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        this.http
            .post(``, {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            .subscribe((resData) => {
                console.log(resData);
            });
    }

    login(email: string, password: string) {}
}
