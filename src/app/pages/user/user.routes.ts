import { Routes } from "@angular/router";
import { HomeUserComponent } from "./home-user/home-user.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

export const UserRoutes: Routes = [
    {
        path: "",
        component: HomeUserComponent
    },
    {
        path: "cart",
        component: ShoppingCartComponent
    },
];
