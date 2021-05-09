import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListCustomersComponent} from './list-customers/list-customers.component';
import {AddCustomerComponent} from './add-customer/add-customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  { path: 'customers', component: ListCustomersComponent },
  { path: 'add', component: AddCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
