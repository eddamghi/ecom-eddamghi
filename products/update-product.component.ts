import {Component, Inject} from "@angular/core";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {UpdateCustomerRequest} from "../customers/customer.type";
import {UpdateProductRequest} from "./product.type";

@Component({
	selector: 'create-product',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	template: `
		<h1 class="ecom-title">Update Product</h1>
		<form [formGroup]="form" (ngSubmit)="form.valid && ref.dismiss(form.value)">
			<mat-form-field appearance="outline">
				<input matInput placeholder="Name" formControlName="name">
				<mat-error>Name is required</mat-error>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<input matInput placeholder="Price" formControlName="price" type="number">
				<mat-error>Price is required</mat-error>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<input matInput placeholder="Quantity" formControlName="quantity" type="number">
				<mat-error>Quantity is required</mat-error>
			</mat-form-field>
			<button (click)="submit()" [disabled]="!form.valid" mat-raised-button color="primary" type="submit">Update</button>
		</form>
	`,
	styles: [`
		:host {
			padding: 2rem;
		}
		form {
			display: flex;
			flex-direction: column;
			gap: .5rem;
			width: 100%;
		}
	`]
})
export class UpdateProductComponent {
	constructor(public ref: MatBottomSheetRef<UpdateProductComponent>,
				@Inject(MAT_BOTTOM_SHEET_DATA) public data: UpdateProductRequest) {
		this.form.patchValue(data);
	}
	form = new FormGroup({
		name: new FormControl('', Validators.required),
		price: new FormControl(0, Validators.required),
		quantity: new FormControl(0, Validators.required),
	})

	submit() {
		if (!this.form.valid) return;
		this.ref.dismiss(this.form.value);
	}
}
