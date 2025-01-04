import { Routes } from "@angular/router";
import { HomeUserComponent } from "./home-user/home-user.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CreateUpdateUserComponent } from "./components/create-update-user/create-update-user.component";

export const UserRoutes: Routes = [
    {
        path: "",
        component: HomeUserComponent
    },
    {
        path: "edit",
        component: CreateUpdateUserComponent
    },
    {
        path: "cart",
        component: ShoppingCartComponent
    },
];
