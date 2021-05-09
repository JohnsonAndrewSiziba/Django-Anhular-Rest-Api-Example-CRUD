import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { MessageService } from '../message.service';
import { CustomerService } from '../customer.service';
import { Message } from '../message';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html'
})
export class ListCustomersComponent implements OnInit {

  customers: Array<Customer> = [];
  showCustomer: Customer;
  isSelected = false;
  deletedCustomer: Customer;
  returnedMessage: string;

  constructor(private customerService: CustomerService,
              private messageService: MessageService) { }

  setCustomerDetails(customer: Customer){
    this.isSelected = !this.isSelected;
    if (this.isSelected){
      this.showCustomer = customer;
    }else{
      this.showCustomer = undefined;
    }
  }

  // tslint:disable-next-line:typedef
  prepareDeleteCustomer(deleteCustomer: Customer){
    // assign delete-Customer
    this.deletedCustomer = deleteCustomer;
    // reset returned-Message
    this.returnedMessage = undefined;
  }

  /**
   * Delete a Customer by ID
   */
  // tslint:disable-next-line:typedef
  deleteCustomer(){

    console.log('--- Access delelteCustomer() function');

    this.customerService.deleteCustomer(this.deletedCustomer.id)
      .subscribe((message: Message) => {
          console.log(message);
          // remove a deletedCustomer from customers list on view
          this.customers = this.customers.filter(customer => {
            // tslint:disable-next-line:triple-equals
            return customer.id != this.deletedCustomer.id;
          });


          // just reset showCustomer for not showing on view
          this.showCustomer = undefined;

        },
        (error) => {
          console.log(error);
          const errMsg: string = 'Error! Details: ' + error;
          this.messageService.add(errMsg);
        });
  }

  /**
   * Update Customer function
   */
  // tslint:disable-next-line:typedef
  updateCustomer() {
    this.customerService.updateCustomer(this.showCustomer)
      .subscribe((message: Message) => {
          console.log(message);
          // update customers list
          this.customers.map(x => {
            if (x.id == this.showCustomer.id){
              x = this.showCustomer;
            }
          });

          const msg: string = 'Update Successfully! -> New Customer\'s properties: <br>'
            + '<ul>'
            + '<li>' + 'id: ' + this.showCustomer.id + '</li>'
            + '<li>' + 'firstname: ' + this.showCustomer.firstname + '</li>'
            + '<li>' +  'lastname: ' + this.showCustomer.lastname + '</li>'
            + '<li>' +  'age: ' + this.showCustomer.age + '</li>'
            + '<li>' +  'address: ' + this.showCustomer.address + '</li>'
            + '</ul>';
          this.messageService.add(msg);
        }
        , (error) => {
          console.log(error);
          const errMsg = 'Update Fail ! Error = ' + error;
          this.messageService.add(errMsg);
        });
  }

  /**
   * Retrieve all Customer from Backend
   */
  // tslint:disable-next-line:typedef
  retrieveAllCustomers() {
    this.customerService.retrieveAllCustomers()
      .subscribe((data) => {
          console.log(data);
          this.customers = data;
        }
        , (error) => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    this.retrieveAllCustomers();
  }
}
