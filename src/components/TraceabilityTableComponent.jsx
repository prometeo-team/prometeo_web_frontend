/* eslint-disable react/prop-types */

import { useState, useEffect, React  } from "react";
import { Table, Checkbox , Input, Button, Select, ConfigProvider, Spin } from "antd";
import { HiSearchCircle, HiPlus } from "react-icons/hi";
import { LoadingOutlined } from '@ant-design/icons';
import "./TableComponent.css";

function TraceabilityTableComponent({ dataSource, columns, careers, selectedDocuments, select }) {
  const filasConKey = dataSource.map((fila, index) => ({
    ...fila,
    key: index,
  }));

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [careerList, setCareerList] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(careerList.length > 0 ? careerList[0].value : undefined);
  const [isButtonVisible2, setIsButtonVisible2] = useState(true);
  const [loading, setLoading] = useState(false);

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const [columnsadd, setColumnsadd] = useState(columns);

 

  useEffect(() => {
    const fetchCareers = () => {
      const items = careers.map(item => ({ value: item, label: item }));
      setCareerList(items);
  
      // Establecer el primer elemento como carrera seleccionada por defecto
      if (items.length > 0) {
        setSelectedCareer(items[0].value);
      }
    };
  
    fetchCareers();
  }, [careers]);

  const addActionColumn = () => {
    setColumnsadd([
      ...columns,
      {
        title: 'Seleccionar',
        dataIndex: 'select',
        key: 'select',
        render: (_, record) => (
          <ConfigProvider
            theme={{
              token: {
                colorPrimary:"#43737e",
              },
            }}
          >
            <Checkbox 
              checked={selectedDocuments.includes(record.Id)}
              onChange={(e) => parameterAction(record.Id, e.target.checked)}
            />
          </ConfigProvider>
          
        ),
      },
    ]);
  };

  const filteredData = filasConKey.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleMenuClick = (e) => {
    select(e);
  };

  const handleButtonClick = (e) => {
    setIsButtonVisible2(false);
    setLoading(true);
    degree(e);
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
              value={selectedCareer} // Aquí usamos el estado "selectedCareer"
              style={{ width: 250 }}
              onChange={(value) => {
                setSelectedCareer(value);
                handleMenuClick(value); // Llama a la función cuando cambia la selección
              }}
              options={careerList} // Las opciones vienen de "careerList"
              placeholder="Selecciona una carrera" // Placeholder para cuando no haya valor seleccionado
            />
            {loading  && (
            <div className="loader-container">
              <Spin indicator={<LoadingOutlined spin />} size="large" />
          </div>
          )}
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

export default TraceabilityTableComponent;
