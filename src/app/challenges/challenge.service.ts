import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Challenge } from "./challenge.model";
import { DayStatus } from "./day.model";
import { take, tap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Day } from "./day.model";
import { AuthService } from "../auth/auth.service";
import { OnDestroy } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ChallengeService implements OnDestroy {
    private _currentChallenge = new BehaviorSubject<Challenge>(null);
    private userSub: Subscription;
    // public title: string;
    // public description: string;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userSub = this.authService.user.subscribe((user) => {
            if (!user) {
                this._currentChallenge.next(null);
            }
        });
    }

    get currentChallenge() {
        return this._currentChallenge.asObservable();
    }

    fetchCurrentChallenge() {
        return this.authService.user.pipe(
            switchMap((currentUser) => {
                return this.http
                    .get<{
                        title: string;
                        description: string;
                        month: number;
                        year: number;
                        _days: Day[];
                    }>("")
                    .pipe(
                        tap((resData) => {
                            if (resData) {
                                const loadedChallenge = new Challenge(
                                    resData.title,
                                    resData.description,
                                    resData.year,
                                    resData.month,
                                    resData._days
                                );

                                this._currentChallenge.next(loadedChallenge);
                            }
                        })
                    );
            })
        );
    }

    createNewChallenge(title: string, description: string) {
        const newChallenge = new Challenge(
            title,
            description,
            new Date().getFullYear(),
            new Date().getMonth()
        );

        this.saveToServer(newChallenge);
        // this.http.put("", newChallenge).subscribe((res) => console.log(res));
        this._currentChallenge.next(newChallenge);
    }

    updateDayStatus(dayInMonth: number, status: DayStatus) {
        this._currentChallenge.pipe(take(1)).subscribe((challenge) => {
            if (!challenge || challenge.days.length < dayInMonth) {
                return;
            }

            const dayIndex = challenge.days.findIndex(
                (d) => d.dayInMonth === dayInMonth
            );

            challenge.days[dayIndex].status = status;
            this._currentChallenge.next(challenge);

            console.log(challenge.days[dayIndex]);
            this.saveToServer(challenge);
        });
    }

    updateChallenge(title: string, description: string) {
        this._currentChallenge.pipe(take(1)).subscribe((challenge) => {
            const updatedChallenge = new Challenge(
                title,
                description,
                challenge.year,
                challenge.month,
                challenge.days
            );

            this.saveToServer(updatedChallenge);
            this._currentChallenge.next(updatedChallenge);
        });
    }

    private saveToServer(challenge: Challenge) {
        this.authService.user
            .pipe(
                switchMap((currentUser) => {
                    if (!currentUser || !currentUser.isAuth) {
                        return;
                    }

                    return this.http.put("", challenge);
                })
            )
            .subscribe((res) => {
                console.log(res);
            });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    cleanUp() {
        this._currentChallenge.next(null);
    }

    // this.http.put("", challenge).subscribe((res) => {
    //     console.log(res);
    // });
    // }
}
