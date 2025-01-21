import { Routes } from "@angular/router";
import { HomeUserComponent } from "./home-user/home-user.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CreateUpdateUserComponent } from "./components/create-update-user/create-update-user.component";
import { AuthFormsComponent } from "../auth/auth-forms/auth-forms.component";

export const UserRoutes: Routes = [
    {
        path: "",
        component: HomeUserComponent
    },
    {
        path: "create-edit",
        component: CreateUpdateUserComponent
    },
    {
        path: "change-password",
        component: AuthFormsComponent
    },
    {
        path: "cart",
        component: ShoppingCartComponent
    },
];
