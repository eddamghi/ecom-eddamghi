import {Component, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Product, UpdateProductRequest} from "./product.type";
import {ProductService} from "./product.service";
import {UpdateProductComponent} from "./update-product.component";

@Component({
	selector: 'product-card',
	standalone: true,
	imports: [
		CommonModule,
		MatCardModule,
		MatButtonModule
	],
	template: `
		<mat-card *ngIf="product">
			<mat-card-header>
				<mat-card-title>{{product.name}}</mat-card-title>
				<mat-card-subtitle>{{ "Product #" + product.id}}</mat-card-subtitle>
			</mat-card-header>
			<mat-card-content>
				<p>{{ "Price: " + product.price + " - Quantity: " + product.quantity }}</p>
			</mat-card-content>
			<mat-card-actions align="end">
				<button mat-button (click)="update(product)">Update</button>
				<button mat-button (click)="delete(product)">Delete</button>
			</mat-card-actions>
		</mat-card>
	`,
	styles: [``]
})
export class ProductCardComponent {
	@Input() product!: Product;
	constructor(private service: ProductService, private bottomSheet: MatBottomSheet) {}

	update(product: Product) {
		const ref = this.bottomSheet.open(UpdateProductComponent, {data: product})
		ref.afterDismissed().subscribe((data: UpdateProductRequest) => {
			this.service.updateProduct$(product.id, data).subscribe(() => {
				this.product = {...this.product, ...data};
			});
		});
	}

	@Output() ondelete = new EventEmitter<Product>();
	delete(product: Product) {
		const confirmed = confirm(`Are you sure you want to delete ${product.name}?`);
		if (confirmed) {
			this.service.deleteProduct$(product.id).subscribe(() => {
				this.ondelete.emit(product);
			});
		}
	}
}
