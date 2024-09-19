import { Routes } from '@angular/router';
import { OverviewPageComponent } from './views/overview-page/overview-page.component';
import { SigninPageComponent } from './views/signin-page/signin-page.component';
import { UsersPageComponent } from './views/users-page/users-page.component';
import { ExpensesPageComponent } from './views/expenses-page/expenses-page.component';
import { SettingsPageComponent } from './views/settings-page/settings-page.component';

export const routes: Routes = [
    {
        path: "",
        component: OverviewPageComponent
    },

    {
        path: "sign-in",
        component: SigninPageComponent
    },

    {
        path: "users",
        component: UsersPageComponent,
    },

    {
        path: "expenses",
        component: ExpensesPageComponent
    },

    {
        path: "settings",
        component: SettingsPageComponent
    }
];
