import { useState } from 'react';
import './CalendarComponent.css';
import { Badge, Calendar, Select } from 'antd';

const { Option } = Select;

const getListData = (value) => {
  let listData;
  switch (value.getDate()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event......',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.getMonth() === 8) {
    return 1394;
  }
};

const App = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const [selectedMonth, setSelectedMonth] = useState(new Date());

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
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
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
      <div className=" flex justify-between">
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

  const getActivitiesForMonth = (month) => {
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const activities = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const listData = getListData(date);
      if (listData.length) {
        activities.push({
          date: date.toISOString().split('T')[0],
          events: listData,
        });
      }
    }
    return activities;
  };

  const activities = getActivitiesForMonth(selectedMonth);

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
        <div className='bg-gray-200  rounded-lg p-5 '>

        <h2 className="font-bold text-black mb-4">
          Actividades de {selectedMonth.toLocaleString('default', { month: 'long' })} {selectedMonth.getFullYear()}
        </h2>
        {activities.map((activity) => (
          <div key={activity.date} className="mb-4">
            <h3 className="text-black pt-2">{activity.date}</h3>
            <ul>
              {activity.events.map((event, index) => (
                <li key={index}>
                  <Badge status={event.type} text={event.content} />
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
