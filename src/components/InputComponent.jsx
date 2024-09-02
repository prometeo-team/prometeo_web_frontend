import PropTypes from 'prop-types';
import { useState } from 'react';
import { Flex, Select, Input, Form } from 'antd';
import './InputComponent.css';

const InputComponent = ({ type, id, name, placeholder, options, variant, value, onChange, disabled }) => {
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
      if (onChange) onChange(e); 
    } else if (type === 'number' && isNaN(inputValue)) {
      setError(true);
      setErrorMessage('Por favor, ingrese un número válido.');
      setShowErrorBorder(true);
      if (onChange) onChange(e); 
    } else if (type === 'box2') {
      // Encuentra la opción seleccionada usando el valor del select
      const selectedOption = options.find(option => option.value === e);
  
      if (selectedOption) {
        const { key, value, label } = selectedOption;
  
        // Enviar la información correcta a onChange
        onChange({
          target: { name, id },
          selectedOption: { key, value, label },
        });
      }
    } else {
      setError(false);
      setErrorMessage('');
      setShowErrorBorder(false);
      if (onChange) onChange(e); 
    }

    // 
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
            name={name}
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
        return (
          <Input
            name={name}
            placeholder={placeholder}
            className={`${variant} bg-gray-200 rounded-md p-2`}
            value={value}
            onChange={handleInputChange}
          />
        );
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
              name={name} 
              value={value}
              onChange={(selectedValue) => onChange({target: {name, value:selectedValue}})} 
              className={`w-full h-10 rounded-md ${variant} select-box`}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          );
          case 'box2':
          return (
            <Select
              id={id}
              name={name} 
              value={value}
              onChange={(selectedValue) => handleInputChange(selectedValue)}  
              className={`w-full h-10 rounded-md ${variant} select-box`}
              disabled={disabled}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value} disabled={option.disabled}>
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
  id: PropTypes.string,  
  name: PropTypes.string,
};

export default InputComponent;
