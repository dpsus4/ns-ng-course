import { Component, OnInit } from "@angular/core";

@Component({
    selector: "ns-today",
    templateUrl: "./today.component.html",
    styleUrls: ["./today.component.scss"],
    moduleId: module.id,
})
export class TodayComponent implements OnInit {
    isHighlighted = false;

    constructor() {}

    ngOnInit(): void {}

    // onDemo() {
    //     this.isHighlighted = !this.isHighlighted;
    // }
}
