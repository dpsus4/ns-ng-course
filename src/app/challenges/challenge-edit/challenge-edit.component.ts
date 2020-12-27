import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-challenge-edit",
    templateUrl: "./challenge-edit.component.html",
    styleUrls: ["./challenge-edit.component.css"],
})
export class ChallengeEditComponent implements OnInit {
    @Output() input = new EventEmitter<string>();
    challengeDescription = "";

    constructor() {}

    ngOnInit(): void {}

    onSetChallenge() {
        // this.currentChallenge = this.challengeDescription;
        this.input.emit(this.challengeDescription);
    }
}