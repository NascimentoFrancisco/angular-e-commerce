import { Routes } from "@angular/router";
import { ShoppingComponent } from "./shopping.component";
import { DetailComponent } from "./detail/detail.component";

export const shoppingRoutes: Routes = [
    {
        path: "",
        component: ShoppingComponent
    },
    {
        path: "detail",
        component: DetailComponent
    }
];
