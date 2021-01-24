import { Input, ViewContainerRef } from "@angular/core";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Page } from "@nativescript/core";
import { ItemEventData } from "@nativescript/core/ui/list-view";
import { ModalDialogService } from "@nativescript/angular";
import { DayModalComponent } from "../day-modal/day-modal.component";
import { UIService } from "../../shared/ui/ui.service";
// import { UIService } from "~/app/shared/ui/ui.service";

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
    constructor(
        private router: RouterExtensions,
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UIService
    ) {}

    onEdit() {
        this.router.navigate(["/challenges/edit"], {
            transition: { name: "slideLeft" },
        });
    }

    onChangeStatus() {
        this.modalDialog
            .showModal(DayModalComponent, {
                fullscreen: true,
                viewContainerRef: this.uiService.getRootVCRef()
                    ? this.uiService.getRootVCRef()
                    : this.vcRef,
                context: { date: new Date() },
            })
            .then((action: string) => {
                console.log(action);
            });
    }
}
