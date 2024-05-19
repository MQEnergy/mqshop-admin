import {useState} from "react";

export function usePagination(initialSize = 10) {
  const [pagination, setPagination] = useState({
    pageSize: initialSize,
    pageIndex: 0,
  });
  const {pageSize, pageIndex} = pagination;

  return {
    // table state
    onPaginationChange: setPagination,
    pagination,
    // API
    limit: pageSize,
    page: pageIndex + 1
  };
}