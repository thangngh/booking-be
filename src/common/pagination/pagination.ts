import { PaginationResultInterface } from "./pagination.result.interface";

export class Pagination<T> {
	public results: T[];
	public pageTotal: number;
	public total: number;

	constructor(paginationResults: PaginationResultInterface<T>) {
		this.results = paginationResults.results;
		this.pageTotal = paginationResults.results.length;
		this.total = paginationResults.total;
	}
}
