import { Input, ViewContainerRef } from "@angular/core";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Page } from "@nativescript/core";
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { ModalDialogService } from "@nativescript/angular";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "../../shared/ui/ui.service";
import { OnInit } from "@angular/core";
import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";
import { Day, DayStatus } from "../day.model";
// import { UIService } from "~/app/shared/ui/ui.service";

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: [
        "./_current-challenge.component.common.css",
        "./current-challenge.component.scss",
    ],
    moduleId: module.id,
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    weekDays = ["S", "M", "T", "W", "T", "F", "S"];
    // days: { dayInMonth: number; dayInWeek: number }[] = [];
    currentChallenge: Challenge;
    // private currentMonth: number;
    // private currentYear: number;
    private curChallengeSub: Subscription;
    // private daysInMonth: number;

    // @Input() challengeTitle = "";

    // onItemTap(args: ItemEventData) {
    //     console.log(args);
    // }
    constructor(
        private router: RouterExtensions,
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService,
        private challengeService: ChallengeService
    ) {}

    ngOnInit() {
        // this.currentYear = new Date().getFullYear();
        // this.currentMonth = new Date().getMonth();
        // this.daysInMonth = new Date(
        //     this.currentYear,
        //     this.currentMonth + 1,
        //     0
        // ).getDate();

        // for (let i = 1; i < this.daysInMonth + 1; i++) {
        //     const date = new Date(this.currentYear, this.currentMonth, i);
        //     const dayInWeek = date.getDay();
        //     this.days.push({ dayInMonth: i, dayInWeek: dayInWeek });
        // }

        this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
            (challenge) => {
                this.currentChallenge = challenge;
            }
        );
    }

    getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
        const startRow = 1;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).getDay();

        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

        return startRow + weekRow;
    }

    onEdit() {
        this.router.navigate(["/challenges/edit"], {
            transition: { name: "slideLeft" },
        });
    }

    onChangeStatus(day: Day) {
        if (!this.getIsSettable(day.dayInMonth)) {
            return;
        }

        this.modalDialog
            .showModal(DayModalComponent, {
                fullscreen: true,
                viewContainerRef: this.uiService.getRootVCRef()
                    ? this.uiService.getRootVCRef()
                    : this.vcRef,
                context: { date: day.date, status: day.status },
            })
            .then((status: DayStatus) => {
                if (status === DayStatus.Open) {
                    return;
                }

                this.challengeService.updateDayStatus(day.dayInMonth, status);
            });
    }

    ngOnDestroy() {
        if (this.curChallengeSub) {
            this.curChallengeSub.unsubscribe();
        }
    }

    getIsSettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }
}
