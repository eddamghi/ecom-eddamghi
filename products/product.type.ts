export type Product = {
	id: number,
	name: string,
	price: number,
	quantity: number,
}

export type CreateProductRequest = {
	name: string,
	price: number,
	quantity: number,
}

export type UpdateProductRequest = {
	name?: string,
	price?: number,
	quantity?: number,
}
