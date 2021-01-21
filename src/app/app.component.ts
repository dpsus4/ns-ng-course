import { OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { AfterViewInit } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { Subscription } from "rxjs";
import { UIService } from "../app/shared/ui/ui.service";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    activeChallenge = "";
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;
    // activeChallenges: string[] = [];

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef
    ) {}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }

            // this.drawerComponent.sideDrawer.toggleDrawerState();
        });

        this.uiService.setRootVCRef(this.vcRef);
    }

    ngAfterViewInit() {
        // this.drawerSub = this.uiService.drawerState.subscribe(() => {
        //     this.drawerComponent.sideDrawer.toggleDrawerState();
        // });

        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
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

    onLogout() {
        this.uiService.toggleDrawer();
    }
}
