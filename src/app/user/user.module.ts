import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyProgramsListComponent } from './my-programs-list/my-programs-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NewProgramComponent } from './new-program/new-program.component';
import { PurchasedProgramsListComponent } from './purchased-programs-list/purchased-programs-list.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { CategorySubscriptionComponent } from './category-subscription/category-subscription.component';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';
import { BaseChartDirective } from 'ng2-charts';
import { FitnessTrackerDialogComponent } from './fitness-tracker-dialog/fitness-tracker-dialog.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    UserComponent,
    MyProgramsListComponent,
    UserDashboardComponent,
    NewProgramComponent,
    PurchasedProgramsListComponent,
    ConsultantComponent,
    WorkoutsComponent,
    CategorySubscriptionComponent,
    FitnessTrackerComponent,
    FitnessTrackerDialogComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule,
    MatPaginatorModule,
    CustomComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
