/**
 * @param pageNumber
 * @param pageSize
 * @param sort
 * @param offset
 * @param paged
 * @param unpaged
 */
export interface PageableType {
  pageNumber: number;
  pageSize: number;
  sort: SortType;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

/**
 * @param empty
 * @param sorted
 * @param unsorted
 */
interface SortType {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
