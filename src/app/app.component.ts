import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { UIService } from "../app/shared/ui/ui.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
    activeChallenge = "";
    private drawerSub: Subscription;
    // activeChallenges: string[] = [];

    constructor(private uiService: UIService) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            console.log("Toggle side drawer");
        });
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    onChallengeInput(challengeDescription: string) {
        // this.activeChallenges.push(challengeDescription);
        this.activeChallenge = challengeDescription;
        console.log(challengeDescription);
    }
}
