import { NgModule } from "@angular/core";
import { CustomSelectComponent } from "./select/custom.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalComponent } from "./modal/modal.component";

@NgModule({
    declarations: [
        CustomSelectComponent,
        ModalComponent
    ],
    imports: [
        CommonModule,

    ],
    providers: [],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        CustomSelectComponent,
        ModalComponent
    ]
})
export class SharedModule { }