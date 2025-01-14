import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreateUpdateComponent } from "./components/create-update/create-update.component";


export const AddressRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "create-update",
        component: CreateUpdateComponent
    }

];
