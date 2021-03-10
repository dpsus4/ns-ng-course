import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "./user.model";
import { take, tap } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { RouterExtensions } from "@nativescript/angular";
import {
    setString,
    getString,
    hasKey,
    remove,
} from "tns-core-modules/application-settings";
import { of } from "rxjs";

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
    private tokenExpirationTimer: number;

    constructor(private http: HttpClient, private router: RouterExtensions) {}

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

    logout() {
        this._user.next(null);
        remove("userData");

        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.router.navigate(["/"], { clearHistory: true });
    }

    autoLogin() {
        if (!hasKey("userData")) {
            return of(false);
        }

        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(getString("userData"));
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            this.router.navigate(["/challenges"], { clearHistory: true });

            return of(true);
        }

        return of(false);
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
        setString("userData", JSON.stringify(user));
        this.autoLogout(user.timeToExpiry);
        this._user.next(user);
    }

    autoLogout(expiryDuration: number) {
        this.tokenExpirationTimer = setTimeout(this.logout, expiryDuration);
    }
}
