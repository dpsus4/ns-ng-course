import { Input } from "@angular/core";
import { Component } from "@angular/core";

@Component({
    selector: "ns-current-challenge",
    templateUrl: "./current-challenge.component.html",
    styleUrls: ["./current-challenge.component.css"],
    moduleId: module.id,
})
export class CurrentChallengeComponent {
    @Input() challenges: string[] = [];
}
