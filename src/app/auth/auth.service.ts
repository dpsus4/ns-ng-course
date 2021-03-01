import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./user.model";
import { take, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

const FIREBASE_API_KEY = "";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
    private _user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {}

    get user() {
        return this._user.asObservable();
    }

    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(``, {
                email: email,
                password: password,
                returnSecureToken: true,
            })
            .pipe(
                catchError((errorRes) => {
                    this.handleError(errorRes.error.error.message);

                    return throwError(errorRes);
                }),
                tap((resData) => {
                    if (resData && resData.idToken) {
                        this.handleLogin(
                            email,
                            resData.idToken,
                            resData.localId,
                            parseInt(resData.expiresIn)
                        );
                    }
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

    private handleLogin(
        email: string,
        token: string,
        userId: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );

        const user = new User(email, userId, token, expirationDate);

        this._user.next(user);
    }
}
