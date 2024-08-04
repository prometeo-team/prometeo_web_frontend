import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './LoaderComponent.css';

const Loader = () => (
  <div className="flex items-center justify-center h-screen w-screen ml-[-20%]">
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
