export interface Pagination {
    currentPage:1;
    itemsPerPage:number;
    totalItems:number;
    totalPages:number;
}
export class PaginatedResult<T>{
    result:T;
    pagination:Pagination;
}
