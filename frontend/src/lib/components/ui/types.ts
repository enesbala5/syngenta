export interface TableResponse {
	totalItems: number;
	pageNumber: number;
	data: any[];
	filters: Record<string, any>;
};