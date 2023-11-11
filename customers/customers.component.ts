import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomerService} from "./customer.service";
import {CustomerCardComponent} from "./customer-card.component";
import {map} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CreateCustomerComponent} from "./create-customer.component";
import {CreateCustomerRequest, Customer} from "./customer.type";

@Component({
	selector: 'customers',
	standalone: true,
	imports: [
		CommonModule,
		CustomerCardComponent,
		MatButtonModule,
		MatIconModule,
	],
	template: `
		<h1 class="ecom-title">Customers</h1>
		<ul *ngIf="customers$ | async as customers">
			<li *ngFor="let customer of customers">
				<customer-card [customer]="customer" (ondelete)="onCustomerDeleted($event)"></customer-card>
			</li>
		</ul>
		<button (click)="createCustomer()" class="add" mat-fab color="primary">
			<mat-icon>add</mat-icon>
		</button>
	`,
	styles: [`
		ul {
			list-style: none;
			padding: 0;
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			li {
				flex: 1 1 20rem;
			}
		}
		.add {
			position: fixed;
			bottom: 1.5rem;
			right: 1.5rem;
		}
	`]
})
export class CustomersComponent {
	constructor(private service: CustomerService, private bottomSheet: MatBottomSheet) {}
	customers$ = this.service
		.getCustomers$()
		.pipe(
			map(response => response._embedded['customers'])
		);

	createCustomer() {
		const ref = this.bottomSheet.open(CreateCustomerComponent);
		ref.afterDismissed().subscribe((request: CreateCustomerRequest) => {
			if (!request) return;
			this.service.createCustomer$(request).subscribe(() => {
				this.customers$ = this.service
					.getCustomers$()
					.pipe(
						map(response => response._embedded['customers'])
					);
			});
		});
	}

	onCustomerDeleted(deletedCustomer: Customer) {
		this.customers$ = this.service
			.getCustomers$()
			.pipe(
				map(response => response._embedded['customers'])
			);
	}
}
