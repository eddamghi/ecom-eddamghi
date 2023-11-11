import {Component} from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

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
		<h1 class="ecom-title">Create Product</h1>
		<form [formGroup]="form" (ngSubmit)="form.valid && ref.dismiss(form.value)">
			<mat-form-field appearance="outline">
				<mat-label>Name</mat-label>
				<input matInput placeholder="Name" formControlName="name">
				<mat-error>Name is required</mat-error>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>Price</mat-label>
				<input matInput placeholder="Price" formControlName="price" type="number" [min]="0">
				<mat-error>Price is required</mat-error>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<mat-label>Quantity</mat-label>
				<input matInput placeholder="Quantity" formControlName="quantity" type="number" [min]="0">
				<mat-error>Quantity is required</mat-error>
			</mat-form-field>
			<button (click)="submit()" [disabled]="!form.valid" mat-raised-button color="primary" type="submit">Create</button>
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
export class CreateProductComponent {
	constructor(public ref: MatBottomSheetRef<CreateProductComponent>) {}
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
