/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import { Table, Space, Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export function ComponentTable({ dataSource, columns, parameterAction }) {
  const filasConKey = dataSource.map((fila, index) => ({
    ...fila,
    key: index,
  }));

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState('');

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const [columnsadd, setColumnsadd] = useState(columns);

  useEffect(() => {
    addActionColumn();
  }, []);

  const addActionColumn = () => {
    setColumnsadd([
      ...columns,
      {
        title: 'Acción',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a href="#" onClick={(e) => parameterAction(e, record)}>
              <EyeOutlined />
            </a>
          </Space>
        ),
      },
    ]);
  };

  const filteredData = filasConKey.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <Input
        placeholder="Buscar"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columnsadd}
        dataSource={filteredData}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: filteredData.length,
          onChange: handlePageChange,
          showSizeChanger: true,
          onShowSizeChange: handlePageChange,
          pageSizeOptions: ['5', '10'],
        }}
      />
    </div>
  );
}