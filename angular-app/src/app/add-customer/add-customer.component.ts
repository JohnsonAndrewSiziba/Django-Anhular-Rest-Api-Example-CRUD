import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { MessageService } from '../message.service';
import {Message} from '../message';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html'
})
export class AddCustomerComponent implements OnInit {
  customer: Customer;

  constructor(private customerService: CustomerService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.customer = new Customer();
  }

  /**
   * Store a Customer to backend server
   */
  // tslint:disable-next-line:typedef
  save() {
    this.customerService.createCustomer(this.customer)
      .subscribe((message: Message) => {
        console.log(message);
        
      }, error => {
        console.log(error);
        
      });
  }

  // tslint:disable-next-line:typedef
  reset(){
    this.customer = new Customer();
  }

  /**
   * Function handles form submitting
   */
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.save();
    this.reset();
  }
}
