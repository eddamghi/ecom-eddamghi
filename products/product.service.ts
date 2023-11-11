import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableResponse} from "../http.types";
import {CreateProductRequest, Product, UpdateProductRequest} from "./product.type";

@Injectable({ providedIn: 'root' })
export class ProductService {
	private endpoint = `${this.serverUrl}/PRODUCT-SERVICE/products`;
	constructor(
		@Inject('serverUrl') private serverUrl: string,
		private http: HttpClient) {}

	getProducts$() {
		return this.http.get<PageableResponse<Product>>(this.endpoint);
	}

	getProduct$(id: number) {
		return this.http.get<Product>(`${this.endpoint}/${id}`);
	}

	createProduct$(product: CreateProductRequest) {
		return this.http.post<Product>(this.endpoint, product);
	}

	updateProduct$(id: number, product: UpdateProductRequest) {
		return this.http.put<Product>(`${this.endpoint}/${id}`, product);
	}

	deleteProduct$(id: number) {
		return this.http.delete(`${this.endpoint}/${id}`);
	}

}
