import PropTypes from 'prop-types';
import { useState } from 'react';
import { Flex, Select, Input, Form } from 'antd';
import './InputComponent.css';

const InputComponent = ({ type,id, placeholder, options, variant, value, onChange }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorBorder, setShowErrorBorder] = useState(false);
  const { Option } = Select;

  const handleInputChange = (e) => {
    const inputValue = e?.target?.value || '';

    if (type === 'correo' && !isValidEmail(inputValue)) {
      setError(true);
      setErrorMessage('Por favor, ingrese un correo electrónico válido.');
      setShowErrorBorder(true);
    } else if (type === 'number' && isNaN(inputValue)) {
      setError(true);
      setErrorMessage('Por favor, ingrese un número válido.');
      setShowErrorBorder(true);
    } else {
      setError(false);
      setErrorMessage('');
      setShowErrorBorder(false);
    }

    if (onChange) onChange(e);  // Pasar el evento completo
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
            value={value}
            onChange={handleInputChange}
          />
        );
      case 'readOnly':
        return <Input id={id} placeholder={placeholder} className={`${variant} bg-gray-200 rounded-md p-2`} readOnly value={value} />;
      case 'string':
        return <Input placeholder={placeholder} className={`${variant} bg-gray-200 rounded-md p-2`} value={value} onChange={handleInputChange} />;
      case 'date':
        return <Input type="date" placeholder={placeholder} className="bg-gray-200 rounded-md p-2" value={value} onChange={handleInputChange} />;
      case 'boolean':
        return (
          <Input
            type="checkbox"
            placeholder={placeholder}
            className="bg-gray-200 rounded-md p-2"
            checked={!!value}
            onChange={(e) => handleInputChange({ target: { value: e.target.checked } })}
          />
        );
      case 'box':
        return (
          <Select
            id={id}
            value={value}
            onChange={onChange}
            className={`w-full h-10 rounded-md ${variant} select-box`}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'correo':
        return (
          <Input
            type="email"
            placeholder={placeholder}
            className={`${variant} bg-gray-200 rounded-md p-2 ${showErrorBorder ? 'error-border' : ''}`}
            value={value}
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
  type: PropTypes.oneOf(['number', 'readOnly', 'string', 'date', 'boolean', 'box', 'correo']).isRequired,
  placeholder: PropTypes.string.isRequired,
  variant: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  onChange: PropTypes.func,
};

export default InputComponent;
