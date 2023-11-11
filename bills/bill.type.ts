import {Product} from "../products/product.type";
import {Customer} from "../customers/customer.type";

export type FullBill = {
	id: number,
	billingDate: string,
	productItems: ProductItem[],
	customerId: number,
	customer: Customer,
}
export type ProductItem = {
	id: number,
	price: number,
	quantity: number,
	productId: number,
	product: Product,
}
