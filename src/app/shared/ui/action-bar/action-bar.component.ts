import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Page } from "@nativescript/core";

declare var android: any;

@Component({
    selector: "ns-action-bar",
    templateUrl: "./action-bar.component.html",
    styleUrls: ["./action-bar.component.css"],
    moduleId: module.id,
})
export class ActionBarComponent implements OnInit {
    @Input() title: string;
    @Input() showBackButton = true;

    constructor(private page: Page, private router: RouterExtensions) {}

    ngOnInit(): void {}

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();

            if (backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor("#171717"),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }
}
