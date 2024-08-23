import { useState, useEffect } from 'react';
import './CalendarComponent.css';
import { Calendar, Select } from 'antd';

const { Option } = Select;

const getListData = (value, comiteDates, consejoDates, requestTypes = []) => {
  const day = value.getDate();
  const month = value.getMonth();
  const year = value.getFullYear();
  const formattedDate = `${year.toString().padStart(4, '0')}-${(month + 1)
    .toString()
    .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  let listData = [];

  if (comiteDates.includes(formattedDate)) {
    listData.push({
      type: 'comite',
      content: 'Comité de Procesos',
    });
  }

  if (consejoDates.includes(formattedDate)) {
    listData.push({
      type: 'consejo',
      content: 'Consejo de Facultad',
    });
  }

  if (Array.isArray(requestTypes)) {
    requestTypes.forEach((request) => {
      if (request.dueDate === formattedDate) {
        listData.push({
          type: 'dueDate',
          content: `${request.nameType} - Fecha límite`,
        });
      }
      if (request.initDate === formattedDate) {
        listData.push({
          type: 'initDate',
          content: `${request.nameType} - Inicio`,
        });
      }
    });
  }

  return listData;
};



const fetchDates = async (setComiteDates, setConsejoDates) => {
  try {
    const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/processDate/getAllProcessDates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`, //tocara quitarlo
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data;

    const comiteMatch = data.match(/Comité de Procesos, Dates: ([^}]*)/);
    const consejoMatch = data.match(/Consejo de Facultad, Dates: ([^}]*)/);

    if (comiteMatch) {
      const comiteDatesArray = comiteMatch[1].split(',');
      setComiteDates(comiteDatesArray);
    }

    if (consejoMatch) {
      const consejoDatesArray = consejoMatch[1].split(',');
      setConsejoDates(consejoDatesArray);
    }
  } catch (error) {
    console.error("Error al obtener las fechas:", error);
  }
};

const fetchRequestTypes = async (setRequestTypes) => {
  try {
    const response = await fetch(`https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/requestType/getAllRequestTypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`, //tocara quitarlo
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    setRequestTypes(result.data);
  } catch (error) {
    console.error("Error al obtener los tipos de solicitudes:", error);
  }
};

const getMonthData = (value) => {
  if (value.getMonth() === 8) {
    return 1394;
  }
  return null;
};

const getActivitiesForMonth = (selectedMonth, comiteDates, consejoDates, requestTypes = []) => {
  const activities = [];

  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${year.toString().padStart(4, '0')}-${(month + 1)
      .toString()
      .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const events = [];

    if (comiteDates.includes(formattedDate)) {
      events.push({
        type: 'error',
        content: 'Comité de Procesos',
      });
    }

    if (consejoDates.includes(formattedDate)) {
      events.push({
        type: 'consejo',
        content: 'Consejo de Facultad',
      });
    }

    if (Array.isArray(requestTypes)) {
      requestTypes.forEach((request) => {
        if (request.dueDate === formattedDate) {
          events.push({
            type: 'dueDate',
            content: `${request.nameType} - Fecha límite`,
          });
        }
        if (request.initDate === formattedDate) {
          events.push({
            type: 'initDate',
            content: `${request.nameType} - Inicio`,
          });
        }
      });
    }

    if (events.length > 0) {
      activities.push({
        date: formattedDate,
        events,
      });
    }
  }

  return activities;
};

const App = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [comiteDates, setComiteDates] = useState([]);
  const [consejoDates, setConsejoDates] = useState([]);
  const [requestTypes, setRequestTypes] = useState([]);

  useEffect(() => {
    fetchDates(setComiteDates, setConsejoDates);
    fetchRequestTypes(setRequestTypes);
  }, []);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, comiteDates, consejoDates, requestTypes);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <span className={`bullet bullet-${item.type}`}></span>
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current.toDate());
    if (info.type === 'month') return monthCellRender(current.toDate());
    return info.originNode;
  };

  const disabledDate = (current) => {
    const selectedMonthStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
    const selectedMonthEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    return current < selectedMonthStart || current > selectedMonthEnd;
  };
  const headerRender = ({ value, onChange }) => {
    const start = currentYear;
    const end = nextYear;
    const years = [];
    for (let i = start; i <= end; i++) {
      years.push(i);
    }

    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(i);
    }

    const selectedYear = value.year();
    const selectedMonth = value.month();

    return (
      <div className="flex justify-between">
        <Select
          value={selectedYear}
          onChange={(newYear) => {
            const newValue = value.clone().year(newYear);
            onChange(newValue);
            setSelectedMonth(newValue.toDate());
          }}
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
        <Select
          value={selectedMonth}
          onChange={(newMonth) => {
            const newValue = value.clone().month(newMonth);
            onChange(newValue);
            setSelectedMonth(newValue.toDate());
          }}
        >
          {months.map((month) => (
            <Option key={month} value={month}>
              {new Date(0, month).toLocaleString('default', { month: 'long' })}
            </Option>
          ))}
        </Select>
      </div>
    );
  };

  const activities = getActivitiesForMonth(selectedMonth, comiteDates, consejoDates, requestTypes);

  return (
    <div className="flex custom-flex-col">
      <div className="w-10/12 custom-calendar">
        <Calendar
          cellRender={cellRender}
          disabledDate={disabledDate}
          headerRender={headerRender}
          onPanelChange={(date) => setSelectedMonth(date.toDate())}
        />
      </div>
      <div className="ml-3 pl-4 pt-4 pb-4 pr-4 bg-[#97B749] rounded-lg shadow-md">
        <div className='bg-gray-100 rounded-lg p-5'>
          <h2 className="font-bold text-black mb-4">
            Actividades de {selectedMonth.toLocaleString('default', { month: 'long' })} {selectedMonth.getFullYear()}
          </h2>
          {activities.map((activity) => (
            <div key={activity.date} className="mb-4">
              <h3 className="text-black pt-2">{activity.date}</h3>
              <ul>
                {activity.events.map((event, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <span className={`bullet bullet-${event.type}`}></span>
                    <span className="ml-2">{event.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;