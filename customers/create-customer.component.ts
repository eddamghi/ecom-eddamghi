import {Component} from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
	selector: 'create-customer',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	template: `
		<h1 class="ecom-title">Create Customer</h1>
		<form [formGroup]="form" (ngSubmit)="form.valid && ref.dismiss(form.value)">
			<mat-form-field appearance="outline">
				<input matInput placeholder="Name" formControlName="name">
				<mat-error>Name is required</mat-error>
			</mat-form-field>
			<mat-form-field appearance="outline">
				<input matInput placeholder="Email" formControlName="email">
				<mat-error>Email is required</mat-error>
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
export class CreateCustomerComponent {
	constructor(public ref: MatBottomSheetRef<CreateCustomerComponent>) {}
	form = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
	})

	submit() {
		if (!this.form.valid) return;
		this.ref.dismiss(this.form.value);
	}
}
