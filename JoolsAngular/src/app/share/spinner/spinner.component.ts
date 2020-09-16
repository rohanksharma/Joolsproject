import { Component } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";


@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html'
})

export class SpinnerComponent {

    constructor(private spinnerService: NgxSpinnerService) {

    }

    showSpinner() {
        this.spinnerService.show();
    }

    hideSpinner() {
        this.spinnerService.hide();
    }

}