import { DocPreview } from '@/__stories-template__';
import { PriviewProps } from '@/__stories-template__/DocPreview';
import * as React from 'react';
import Pagination from '../index';

const PaginationDemo = (props: PriviewProps) => {
  const [page, setPage] = React.useState(2);
  return (
    <DocPreview {...props}>
      <div style={{ width: '100%', height: 300 }}>
        <h2>默认背景</h2>
        <Pagination pageCount={1000} pageRangeDisplayed={5} marginPagesDisplayed={2} />
        <Pagination
          pageCount={1000}
          size="compact"
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
        />
        <h2>control</h2>
        <Pagination
          pageCount={1000}
          size="compact"
          forcePage={page}
          onPageChange={(selectedItem) => {
            console.log(selectedItem, 'selectedItem');
            setPage(selectedItem.selected);
          }}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
        />
        <h2>小屏 中间item只有三个</h2>
        <Pagination
          pageCount={1000}
          size="compact"
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
        />
      </div>

      <div style={{ width: '100%', height: 300 }}>
        <h2>assist-bg</h2>
        <Pagination
          pageCount={1000}
          type="assist"
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
        />
        <Pagination
          pageCount={1000}
          type="assist"
          size="compact"
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
        />
      </div>
    </DocPreview>
  );
};

export default PaginationDemo;
