import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [PageNotFoundComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
