import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button } from 'antd';
import './ComponentTittle2.css'; // Import the CSS file

const Title = ({ title, codigo, tipo }) => {
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchValidation = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/request/validationExpired?idRequest=${codigo}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        const result = await response.json();
        if (response.ok) {
          setIsExpired(result.data);
        }
      } catch (error) {
        console.error("Error al validar la solicitud:", error);
      }
    };

    fetchValidation();
  }, [codigo]);

  const popoverContent = (
    <div>
      <p>La solicitud ha expirado.</p>
    </div>
  );

  return (
    <div>
      <h1 className="flex items-center text-xl md:text-3xl mb-3">
        {title} <span className="ml-2">{codigo}<span className="ml-2">{tipo}</span></span>
        {isExpired && (
          <Popover content={popoverContent} title="Estado de la solicitud">
            <Button
              type="primary"
              className="ml-2 expired-button"
            >
              ¡Solicitud vencida!
            </Button>
          </Popover>
        )}
      </h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  codigo: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
};

export default Title;
