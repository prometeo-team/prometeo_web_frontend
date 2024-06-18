import { useState, useEffect } from "react";
import { Table, Space, Input } from "antd";
import { FaEye } from "react-icons/fa";
import { HiSearchCircle } from "react-icons/hi";
import "./TableComponent.css";
import { Button } from "antd";
import PropTypes from 'prop-types';


function TableComponent({ dataSource, columns, parameterAction }) {
  const filasConKey = dataSource.map((fila, index) => ({
    ...fila,
    key: index,
  }));

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");

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
        title: "Acción",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <a
              className="text-3xl"
              href="#"
              onClick={(e) => parameterAction(e, record)}
            >
              <FaEye />
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
    <div className="mx-auto">
      <div className="boxTable border-2 border-gray-300 p-5 rounded-2xl text-5xl">
        <div className="mb-3 w-full md:w-[40rem] flex">
          <Input
            placeholder="Buscar aquí..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<HiSearchCircle className="w-8 h-8" />}
          />
          <Button
            to="/homePage"
            type="primary"
            className="color-button text-sm md:text-base lg:text-lg h-auto ml-2"
          >
            Buscar
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={columnsadd}
            dataSource={filteredData}
            rowClassName={() => "bg-white"}
            pagination={{
              current: page,
              pageSize: pageSize,
              total: filteredData.length,
              onChange: handlePageChange,
              showSizeChanger: true,
              onShowSizeChange: handlePageChange,
              pageSizeOptions: ["5", "10"],
            }}

          />
        </div>
      </div>
    </div>
  );
}

TableComponent.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
    })
  ).isRequired,
  parameterAction: PropTypes.func,
};


export default TableComponent;
