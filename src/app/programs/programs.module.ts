import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRoutingModule } from './programs-routing.module';
import { AppMaterialModule } from '../app-material/app-material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProgramListComponent } from './program-list/program-list.component';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { AttributesDialogComponent } from './attributes-dialog/attributes-dialog.component';
import { CommentsDialogComponent } from './comments-dialog/comments-dialog.component';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';

@NgModule({
  declarations: [
    ProgramListComponent,
    ProgramDetailsComponent,
    CategoryDialogComponent,
    AttributesDialogComponent,
    CommentsDialogComponent,
    BuyDialogComponent,
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    AppMaterialModule,
    MatPaginatorModule,
    CustomComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProgramsModule {}
