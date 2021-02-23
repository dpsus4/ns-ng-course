import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { OnChanges } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PageRoute, RouterExtensions } from "@nativescript/angular";
import { take } from "rxjs/operators";
import { ChallengeService } from "../challenge.service";

@Component({
    selector: "ns-challenge-edit",
    templateUrl: "./challenge-edit.component.html",
    styleUrls: ["./challenge-edit.component.scss"],
    moduleId: module.id,
})
export class ChallengeEditComponent implements OnInit {
    isCreating = true;
    title = "";
    description = "";

    constructor(
        private activatedRoute: ActivatedRoute,
        private pageRoute: PageRoute,
        private router: RouterExtensions,
        private challengeService: ChallengeService
    ) {}

    ngOnInit() {
        // this.activatedRoute.paramMap.subscribe(paramMap => {
        //     console.log(paramMap.get("mode"));
        // });

        this.pageRoute.activatedRoute.subscribe((activatedRoute) => {
            activatedRoute.paramMap.subscribe((p) => {
                if (p.has("mode")) {
                    // console.log(p.get("mode"));
                    this.isCreating = true;
                } else {
                    this.isCreating = p.get("mode") !== "edit";
                }

                if (!this.isCreating) {
                    this.challengeService.currentChallenge
                        .pipe(take(1))
                        .subscribe((challenge) => {
                            this.title = challenge.title;
                            this.description = challenge.description;
                        });
                }
            });
        });
    }

    onSubmit(title: string, description: string) {
        // console.log(title, description);
        this.challengeService.createNewChallenge(title, description);
        this.router.backToPreviousPage();

        this.challengeService.updateChallenge(title, description);

        this.router.backToPreviousPage();
    }
    // @Output() input = new EventEmitter<string>();
    // challengeDescription = "";

    // constructor() {}

    // ngOnInit(): void {}

    // onSetChallenge() {
    //     // this.currentChallenge = this.challengeDescription;
    //     this.input.emit(this.challengeDescription);
    // }
}
