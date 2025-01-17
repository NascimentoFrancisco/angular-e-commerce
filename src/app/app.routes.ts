import { Routes } from '@angular/router';
import { CreateUpdateUserComponent } from './pages/user/components/create-update-user/create-update-user.component';
import { HomeComponent } from './pages/home/home/home.component';
import { AuthFormsComponent } from './pages/auth/auth-forms/auth-forms.component';
import { ProductDetailsComponent } from './pages/home/components/product-details/product-details.component';
import { UserRoutes } from './pages/user/user.routes';
import { PaymentRoutes } from './pages/payment/payment.routes';
import { AddressRoutes } from './pages/address/address.routes';
import { shoppingRoutes } from './pages/shopping/shopping.routes';
import { authGuard } from './guards/auth.guard';

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
    },
    {
        path: "user",
        children: UserRoutes,
        canActivate: [authGuard],
    },
    {
        path: "address",
        children: AddressRoutes,
        canActivate: [authGuard],
    },
    {
        path: "payment",
        children: PaymentRoutes,
        canActivate: [authGuard],
    },
    {
        path: "shopping",
        children: shoppingRoutes,
        canActivate: [authGuard]
    }
];
