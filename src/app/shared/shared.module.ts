import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [PageNotFoundComponent, LoaderComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [FormsModule, ReactiveFormsModule, LoaderComponent],
})
export class SharedModule {}
