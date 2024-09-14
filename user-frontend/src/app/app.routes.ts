import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { authGuard, loginGuard } from './guard/auth/auth.guard';
import { AddRecordComponent } from './pages/add-record/add-record.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RecordListComponent } from './pages/record-list/record-list.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

export const routes: Routes = [
    {
        path: "", component: DashboardComponent,
        canActivate: [authGuard],
        title: "Dashboard"
    },
    {
        path: "login", component: LoginComponent,
        canActivate: [loginGuard],
        title: "Login"
    },
    {
        path: "update-password", component: UpdatePasswordComponent,
        canActivate: [authGuard],
        title: "Update Password"
    },
    {
        path: "addrecord", component: AddRecordComponent,
        canActivate: [authGuard],
        title: "Add Record"
    },
    {
        path: "records", component: RecordListComponent,
        canActivate: [authGuard],
        title: "Transactions"
    },
    {
        path: "**", component: PageNotFoundComponent,
        title: "Page Not Found"
    }
];
