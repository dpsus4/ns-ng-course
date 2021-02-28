import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core";
import { AuthService } from "./auth.service";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    isLogin = true;
    isLoading = false;
    @ViewChild("passwordEl") passwordEl: ElementRef<TextField>;
    @ViewChild("emailEl") emailEl: ElementRef<TextField>;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required, Validators.email],
            }),
            password: new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required, Validators.minLength(6)],
            }),
        });

        this.form.get("email").statusChanges.subscribe((status) => {
            this.emailControlIsValid = status === "VALID";
        });

        this.form.get("password").statusChanges.subscribe((status) => {
            this.passwordControlIsValid = status === "VALID";
        });
    }

    onSignin() {
        this.router.navigate(["/today"]);
    }

    onSubmit() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        if (!this.form.valid) {
            return;
        }

        const email = this.form.get("email").value;
        const password = this.form.get("password").value;
        this.form.reset();
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
        this.isLoading = true;

        if (this.isLogin) {
            this.authService.login(email, password).subscribe(
                (resData) => {
                    this.isLoading = false;
                    this.router.navigate(["/challenges"]);
                },
                (err) => {
                    console.log(err);
                    this.isLoading = false;
                }
            );
            // console.log("Logging in...");
        } else {
            this.authService.login(email, password).subscribe(
                (resData) => {
                    this.isLoading = false;
                    this.router.navigate(["/challenges"]);
                },
                (err) => {
                    console.log(err);
                    this.isLoading = false;
                }
            );
            // console.log("Signing up...");
        }

        // this.router.navigate(['/challenges']);
    }

    onDone() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    onSwitch() {
        this.isLogin = !this.isLogin;
    }
}
