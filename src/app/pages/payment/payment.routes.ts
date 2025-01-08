import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CreditCartComponent } from "./components/credit-cart/credit-cart.component";
import { BankSlipComponent } from "./components/bank-slip/bank-slip.component";

export const PaymentRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "bank-slip",
        component: BankSlipComponent
    }
];
