import { useEffect } from 'react';
import './LoginComponent.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

const error = () => {
    message.error('Para cambiar tu contraseña, debes comunicarte con mesadeservicio@unbosque.edu.co a través de tu correo electrónico institucional de la Universidad El Bosque.');
};

const LoginComponent = () => {
    const [form] = Form.useForm(); // Obtiene la instancia del formulario

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const testCredentials = {
        username: 'usuario_prueba',
        password: 'contraseña_prueba',
    };

    useEffect(() => {
        // Setea automáticamente las credenciales de prueba al cargar la página
        form.setFieldsValue(testCredentials);
    }, [form, testCredentials]);

    const onFinish = async (values) => {
        const { username, password } = values;
        const userCredentials = { username, password };
        console.log('User credentials:', userCredentials);

        try {
            // Realiza la solicitud al servidor
            const response = await fetch('https://prometeo-backend-e8g5d5gydzgqezd3.eastus-01.azurewebsites.net/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });
            const responseJson = await response.json();
            if (responseJson.status == 200) {
                // Redirige a la página "/crear-solicitud" si las credenciales son correctas
                const token = responseJson.data.split(' ')[1];
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', username);
               
                window.location.href = '/student/crear-solicitud';
            } else {
                // Maneja el caso en el que las credenciales son incorrectas
                message.error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Ocurrió un error al intentar iniciar sesión');
        }
    };



    return (
        <Form
            name="normal_login"
            className="login-form width-size ml-4 mr-4 text-center"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <h3 className="text-lg mb-2 text-left">Nombre de usuario</h3>
            <Form.Item
                className="mb-4"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Por favor, ingrese su nombre de usuario!',
                        validateStatus: 'error', // Agrega este atributo para controlar el color del mensaje
                    },
                    {
                        pattern: /^[a-zA-Z0-9._%+-]/,
                        message: 'Por favor, ingrese un correo electrónico válido de @unbosque.edu.co',
                    },
                ]}
            >
                <Input className="input-lg"
                    prefix={<UserOutlined className="site-form-item-icon custom-form text-xl" />}
                    placeholder="Ingrese su nombre de usuario"
                />
            </Form.Item>
            <h3 className='labels text-lg  mb-2 text-left'>Contraseña</h3>
            <Form.Item
                name="password"
                className="mb-4 "
                rules={[
                    {
                        required: true,
                        message: 'Por favor, ingrese su contraseña!',
                        validateStatus: 'error', // Agrega este atributo para controlar el color del mensaje
                    },
                ]}
            >
                <Input
                    className="input-lg"
                    prefix={<LockOutlined className="site-form-item-icon text-xl" />}
                    type="password"
                    placeholder="Ingrese su contraseña"
                />
            </Form.Item>
            <Form.Item className='buttons mt-12'>
                <Button type="primary" htmlType="submit" className="login-form-button custom-white-button ">
                    Ingresar
                </Button>

                <Button type="secondary" onClick={error}>
                    <Text underline color='white'>Olvide mi contraseña</Text>
                </Button>

            </Form.Item>
        </Form>

    );
};

export default LoginComponent;
