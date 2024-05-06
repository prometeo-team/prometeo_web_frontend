import PropTypes from 'prop-types';
import { useState } from 'react';
import { Flex, Select, Input, Form } from 'antd';
import './InputComponent.css';

const InputComponent = ({ type, placeholder, variant, options }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorBorder, setShowErrorBorder] = useState(false);

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setError(false);
    setErrorMessage('');
    setShowErrorBorder(false);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (type === 'correo' && !isValidEmail(inputValue)) {
      setError(true);
      setErrorMessage(<span className="text-font text-red-500 ">Por favor, ingrese un correo electrónico válido.</span>);
      setShowErrorBorder(true);
    } else if (type === 'number' && isNaN(inputValue)) {
      setError(true);
      setErrorMessage(<span className="text-font text-red-500">Por favor, ingrese un número válido.</span>);
      setShowErrorBorder(true);
    } else {
      setError(false);
      setErrorMessage('');
      setShowErrorBorder(false);
    }
  };


  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const renderInput = () => {
    switch (type) {
      case 'number':
        return (
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={placeholder}
            className={`${variant} bg-gray-200 rounded-md p-2 ${showErrorBorder ? 'error-border' : ''}`}
            onChange={handleInputChange}
          />
        );
      case 'readOnly':
        return <Input placeholder={placeholder} className={`${variant} bg-gray-200 rounded-md p-2`} readOnly/>;
      case 'string':
        return <Input placeholder={placeholder} className={`${variant} bg-gray-200 rounded-md p-2`} />;
      case 'date':
        return <Input type="date" placeholder={placeholder} className="bg-gray-200 rounded-md p-2" />;
      case 'boolean':
        return <Input type="checkbox" placeholder={placeholder} className="bg-gray-200 rounded-md p-2" />;
      case 'box':
        return (
          <Select
            value={selectedOption}
            options={options}
            onChange={handleOptionSelect}
            className={`w-full h-10 rounded-md ${variant} select-box`}
          />
        );
      case 'correo':
        return (
          <Input
            type="email"
            placeholder={placeholder}
            className={`${variant} bg-gray-200 rounded-md p-2 ${showErrorBorder ? 'error-border' : ''}`}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form.Item
      validateStatus={error ? 'error' : ''}
      help={error && errorMessage}
    >
      <Flex vertical gap={8} alignItems="center">
        {renderInput()}
      </Flex>
    </Form.Item>
  );
};

InputComponent.propTypes = {
  type: PropTypes.oneOf(['number','readOnly', 'string', 'date', 'boolean', 'box', 'correo']).isRequired,
  placeholder: PropTypes.string.isRequired,
  variant: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default InputComponent;
