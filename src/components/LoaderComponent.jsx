// LoaderComponent.jsx
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './LoaderComponent.css';

const Loader = ({ className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <Spin
      indicator={
        <LoadingOutlined
          className="custom-loading-icon"
          spin
        />
      }
    />
  </div>
);

export default Loader;
