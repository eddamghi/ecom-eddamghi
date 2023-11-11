export type Customer = {
	id: number;
	name: string;
	email: string;
}

export type CreateCustomerRequest = {
	name: string;
	email: string;
}

export type UpdateCustomerRequest = {
	name?: string;
	email?: string;
}
