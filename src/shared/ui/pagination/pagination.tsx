'use client';

import ReactPaginate from 'react-paginate';

import { Box } from '@/shared/ui';

import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box className={styles.root}>
      <ReactPaginate
        previousLabel="←"
        nextLabel="→"
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        forcePage={currentPage - 1}
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        pageLinkClassName={styles.pageLink}
        previousClassName={styles.previous}
        nextClassName={styles.next}
        previousLinkClassName={styles.previousLink}
        nextLinkClassName={styles.nextLink}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        breakClassName={styles.break}
        breakLinkClassName={styles.breakLink}
      />
    </Box>
  );
};
