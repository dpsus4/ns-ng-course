import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { TextField } from "@nativescript/core";

@Component({
    selector: "ns-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    @ViewChild("passwordEl") passwordEl: ElementRef<TextField>;
    @ViewChild("emailEl") emailEl: ElementRef<TextField>;

    constructor(private router: RouterExtensions) {}

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
    }

    onSignin() {
        this.router.navigate(["/today"]);
    }

    onSubmit() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        const email = this.form.get("email").value;
        const password = this.form.get("password").value;

        console.log(email, password);
    }
}
