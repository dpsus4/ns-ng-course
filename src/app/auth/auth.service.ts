import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

const FIREBASE_API_KEY = "";

@Injectable({ providedIn: "root" })
export class AuthService {
    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http
            .post(``, {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            .pipe(
                catchError((errorRes) => {
                    this.handleError(errorRes.error.error.message);

                    return throwError(errorRes);
                })
            );
        // .subscribe((resData) => {
        //     console.log(resData);
        // });
    }

    login(email: string, password: string) {
        return this.http
            .post("", {
                email: email,
                password: password,
                returnSecureToken: "",
            })
            .pipe(
                catchError((errorRes) => {
                    this.handleError(errorRes.error.error.message);

                    return throwError(errorRes);
                })
            );
        // .subscribe((resData) => {
        //     console.log(resData);
        // });
    }

    private handleError(errorMessage: string) {
        switch (errorMessage) {
            case "EMAIL_EXISTS":
                alert("This email address exists already!");
                break;
            case "INVALID_PASSWORD":
                alert("This password is invalid!");
                break;
            default:
                alert("Authentication failed, check your credentials");
        }
    }
}
