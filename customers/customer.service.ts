import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PageableResponse} from "../http.types";
import {CreateCustomerRequest, Customer, UpdateCustomerRequest} from "./customer.type";

@Injectable({ providedIn: 'root' })
export class CustomerService {
	private endpoint = `${this.serverUrl}/CUSTOMER-SERVICE/customers`;
	constructor(
		@Inject('serverUrl') private serverUrl: string,
		private http: HttpClient
	) {}

	getCustomers$() {
		return this.http.get<PageableResponse<Customer>>(this.endpoint);
	}

	getCustomer$(id: number) {
		return this.http.get<Customer>(`${this.endpoint}/${id}`);
	}

	createCustomer$(customer: CreateCustomerRequest) {
		return this.http.post<Customer>(this.endpoint, customer);
	}

	updateCustomer$(id: number, customer: UpdateCustomerRequest) {
		return this.http.put<Customer>(`${this.endpoint}/${id}`, customer);
	}

	deleteCustomer$(id: number) {
		return this.http.delete(`${this.endpoint}/${id}`);
	}

}
