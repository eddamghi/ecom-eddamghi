import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FullBill} from "./bill.type";

@Injectable({ providedIn: 'root' })
export class BillingService {
	private endpoint = `${this.serverUrl}/BILLING-SERVICE/fullBill`;
	constructor(
		@Inject('serverUrl') private serverUrl: string,
		private http: HttpClient
	) {}

	getFullBill$(id: number) {
		return this.http.get<FullBill>(`${this.endpoint}/${id}`);
	}
}
