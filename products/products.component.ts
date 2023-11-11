import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ProductService} from "./product.service";
import {map} from "rxjs";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ProductCardComponent} from "./product-card.component";
import {CreateProductRequest, Product} from "./product.type";
import {CreateProductComponent} from "./create-product.component";

@Component({
	selector: 'products',
	standalone: true,
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		ProductCardComponent
	],
	template: `
		<h1 class="ecom-title">Products</h1>
		<ul *ngIf="products$ | async as products">
			<li *ngFor="let product of products">
				<product-card [product]="product" (ondelete)="onProductDeleted($event)"></product-card>
			</li>
		</ul>
		<button (click)="createProduct()" class="add" mat-fab color="primary">
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
export class ProductsComponent {
	constructor(private service: ProductService, private bottomSheet: MatBottomSheet) {}
	products$ = this.service
		.getProducts$()
		.pipe(
			map(response => response._embedded['products'])
		);
	createProduct() {
		const ref = this.bottomSheet.open(CreateProductComponent);
		ref.afterDismissed().subscribe((data: CreateProductRequest) => {
			this.service.createProduct$(data).subscribe((product: Product) => {
				this.products$ = this.service.getProducts$().pipe(
					map(response => response._embedded['products'])
				);
			});
		});
	}

	onProductDeleted(deletedProduct: Product) {
		this.products$ = this.products$.pipe(
			map(products => products.filter(product => product.id !== deletedProduct.id))
		);
	}
}
