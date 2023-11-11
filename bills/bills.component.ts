import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {BillingService} from "./billing.service";
import { Observable } from "rxjs";
import {FullBill} from "./bill.type";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";

@Component({
	selector: 'bills',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatButtonModule,
		MatCardModule,
		MatListModule,
		MatLineModule
	],
	template: `
		<h1 class="ecom-title">Bills</h1>
		<mat-form-field>
			<mat-label>Bill Id</mat-label>
			<input matInput (keyup)="applyFilter($event)" placeholder="Ex. 1" #input>
		</mat-form-field>
		<mat-card *ngIf="bill$ | async as bill">
			<mat-card-header>
				<mat-card-title>{{ bill.billingDate | date }}</mat-card-title>
				<mat-card-subtitle>{{ "Bill #" + bill.id}}</mat-card-subtitle>
			</mat-card-header>
			<mat-card-content>
				<p [style.height]="'3rem'"></p>
				<h3 mat-subheader [style.font-weight]="500">Product items</h3>
				<ul>
					<li *ngFor="let item of bill.productItems">
						<p mat-line>{{ item.product.name }} ({{ item.quantity }} x {{ item.price }} DH)</p>
					</li>
				</ul>
				<h3 mat-subheader [style.font-weight]="500">Customer</h3>
				<p mat-line>{{ bill.customer.name }} ({{ bill.customer.email }})</p>
			</mat-card-content>
		</mat-card>
	`,
	styles: [`
		.mat-mdc-form-field {
			font-size: 14px;
			width: 100%;
		}
		ul {
			list-style: none;
			padding: 0;
		}
	`]
})
export class BillsComponent {
	constructor(private service: BillingService) {}
	bill$: Observable<FullBill> | undefined;
	applyFilter(ev: KeyboardEvent) {
		const input = ev.target as HTMLInputElement;
		const value = input.value;
		if (value) {
			this.bill$ = this.service.getFullBill$(+value);
		} else {
			this.bill$ = undefined;
		}
	}
}
