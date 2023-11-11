import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomerService} from "./customer.service";
import {Customer, UpdateCustomerRequest} from "./customer.type";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {UpdateCustomerComponent} from "./update-customer.component";

@Component({
	selector: 'customer-card',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule
	],
	template: `
		<mat-card *ngIf="customer">
			<mat-card-header>
				<mat-card-title>{{customer.name}}</mat-card-title>
				<mat-card-subtitle>{{ "Customer #" + customer.id}}</mat-card-subtitle>
			</mat-card-header>
			<mat-card-content>
				<p>{{ customer.email }}</p>
			</mat-card-content>
			<mat-card-actions align="end">
				<button mat-button (click)="update(customer)">Update</button>
				<button mat-button (click)="delete(customer)">Delete</button>
			</mat-card-actions>
		</mat-card>
	`,
	styles: [``]
})
export class CustomerCardComponent {
	@Input() customer!: Customer;
	constructor(private service: CustomerService, private bottomSheet: MatBottomSheet) {}

	update(customer: Customer) {
		const ref = this.bottomSheet.open(UpdateCustomerComponent, {data: customer})
		ref.afterDismissed().subscribe((data: UpdateCustomerRequest) => {
			this.service.updateCustomer$(customer.id, data).subscribe(() => {
				this.customer = {...this.customer, ...data};
			});
		});
	}

	@Output() ondelete = new EventEmitter<Customer>();
	delete(customer: Customer) {
		const confirmed = confirm(`Are you sure you want to delete ${customer.name}?`);
		if (confirmed) {
			this.service.deleteCustomer$(customer.id).subscribe(() => {
				this.ondelete.emit(customer);
			});
		}
	}
}
