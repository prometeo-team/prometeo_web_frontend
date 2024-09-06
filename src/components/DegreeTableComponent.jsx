/* eslint-disable react/prop-types */

import { useState, useEffect, React  } from "react";
import { Table, Space, Input, Button, Select, message } from "antd";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { FaEye } from "react-icons/fa";
import { HiSearchCircle, HiPlus } from "react-icons/hi";
import "./TableComponent.css";

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

  const items = [
    {
      value: '1',
      label: 'Pregrado',
      
    },
    {
      value: '2',
      label: 'PosGrado',
      
    }
  ]

  const handleMenuClick = (e) => {
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="mx-auto">
      <div className="boxTable border-2 border-gray-300 p-5 rounded-2xl text-5xl">
        <div className="mb-3 w-full max-md:flex-col flex justify-around">
          <Input
            className="w-1/2 max-md:w-full max-md:mb-3"
            placeholder="Buscar aquí..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<HiSearchCircle className="w-8 h-8" />}
          />
          <Select
              className="h-10 ml-2 mr-2 max-md:-ml-3 max-md:mb-3"
              // Aquí usamos el estado "selectedCareer"
              style={{ width: 250 }}
              onChange={(value) => {
                handleMenuClick(value); // Llama a la función cuando cambia la selección
              }}
              options={items} // Las opciones vienen de "careerList"
              placeholder="Selecciona una carrera" // Placeholder para cuando no haya valor seleccionado
            />
          <Button type="primary" className='shadow-lg float-right color-button text-sm md:text-base flex items-center lg:text-lg h-12 max-md:mb-3'>Crear Nueva Convocatoria <HiPlus /></Button>

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

export default TableComponent;
