import { Input } from "@angular/core";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ItemEventData } from "@nativescript/core/ui/list-view";

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: ["./current-challenge.component.css"],
    moduleId: module.id,
})
export class CurrentChallengeComponent {
    // @Input() challengeTitle = "";

    // onItemTap(args: ItemEventData) {
    //     console.log(args);
    // }
    constructor(private router: Router) { }

    onEdit() {
        this.router.navigate(["/edit-challenge"]);
    }
}
