import { Routes } from '@angular/router';
import { CreateUpdateUserComponent } from './pages/user/components/create-update-user/create-update-user.component';
import { HomeComponent } from './pages/home/home/home.component';
import { AuthFormsComponent } from './pages/auth/auth-forms/auth-forms.component';
import { ProductDetailsComponent } from './pages/home/components/product-details/product-details.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        component: AuthFormsComponent
    },
    {
        path: "product-detail/:id",
        component: ProductDetailsComponent,
    }
];
