import { Component } from "@angular/core";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent {
    activeChallenge = "";
    // activeChallenges: string[] = [];

    onChallengeInput(challengeDescription: string) {
        // this.activeChallenges.push(challengeDescription);
        this.activeChallenge = challengeDescription;
        console.log(challengeDescription);
    }
 }
