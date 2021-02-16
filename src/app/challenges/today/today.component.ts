import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChallengeService } from "../challenge.service";
import { Day, DayStatus } from "../day.model";

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.scss"],
    moduleId: module.id,
})
export class TodayComponent implements OnInit, OnDestroy {
    isHighlighted = false;
    currentDay: Day;
    private curChallengeSub: Subscription;

    constructor(private challengeService: ChallengeService) {}

    ngOnInit(): void {
        this.challengeService.currentChallenge.subscribe((challenge) => {
            if (challenge) {
                this.currentDay = challenge.currentDay;
            }
        });
    }

    onActionSelected(action: DayStatus) {
        this.challengeService.updateDayStatus(
            this.currentDay.dayInMonth,
            action
        );
    }

    ngOnDestroy() {
        if (this.curChallengeSub) {
            this.curChallengeSub.unsubscribe();
        }
    }

    // onDemo() {
    //     this.isHighlighted = !this.isHighlighted;
    // }
}
