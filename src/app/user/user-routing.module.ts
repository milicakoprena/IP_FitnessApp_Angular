import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MyProgramsListComponent } from './my-programs-list/my-programs-list.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NewProgramComponent } from './new-program/new-program.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { PurchasedProgramsListComponent } from './purchased-programs-list/purchased-programs-list.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { CategorySubscriptionComponent } from './category-subscription/category-subscription.component';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'account',
        component: UserComponent,
      },
      { path: 'my-programs', component: MyProgramsListComponent },
      { path: 'programs', component: PurchasedProgramsListComponent },
      { path: 'new-program', component: NewProgramComponent },
      { path: 'consultant', component: ConsultantComponent },
      { path: 'workouts', component: WorkoutsComponent },
      { path: 'categories', component: CategorySubscriptionComponent },
      { path: 'fitness-tracker', component: FitnessTrackerComponent },
      { path: 'chat', component: ChatComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
