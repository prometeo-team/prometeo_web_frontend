import './CalendarComponent.css';
import { Badge, Calendar, Select } from 'antd';

const { Option } = Select;

const getListData = (value) => {
  let listData;
  switch (value.date()) {
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
  if (value.month() === 8) {
    return 1394;
  }
};

const App = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

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
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const disabledDate = (current) => {
    const year = current.year();
    return year < currentYear || year > nextYear;
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

    return (
      <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
        <Select
          value={value.year()}
          onChange={(newYear) => {
            const newValue = value.clone().year(newYear);
            onChange(newValue);
          }}
        >
          {years.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
        <Select
          value={value.month()}
          onChange={(newMonth) => {
            const newValue = value.clone().month(newMonth);
            onChange(newValue);
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

  return <Calendar cellRender={cellRender} disabledDate={disabledDate} headerRender={headerRender} />;
};

export default App;
