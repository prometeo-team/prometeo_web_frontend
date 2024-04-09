import React, { useState, useEffect } from 'react';
import './LoginComponent.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Space, Typography } from 'antd';
import { useHistory } from 'react-router-dom'; 

const { Text, Link } = Typography;

const LoginComponent = () => {
    const history = useHistory(); // Obtiene la instancia de useHistory
    const [form] = Form.useForm(); // Obtiene la instancia del formulario

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

        // Aquí deberías enviar las credenciales al servidor y recibir la respuesta
        // Puedes simularlo con una función asíncrona y un setTimeout en este ejemplo
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula una solicitud al servidor

        const responseJson = { success: true }; // Simula una respuesta del servidor (true si las credenciales son correctas)

        if (responseJson.success) {
            // Redirige a la página "/crear-solicitud" si las credenciales son correctas
            history.push('/');
        } else {
            // Maneja el caso en el que las credenciales son incorrectas
            console.log('Credenciales incorrectas');
        }
    };

    return (
        <Form
            form={form} // Pasa la instancia del formulario
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <h3>Nombre de usuario</h3>
            <Form.Item
                className="custom-form transparent-background"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon custom-form" />} placeholder="" />
            </Form.Item>
            <h3 className='labels'>Contraseña</h3>
            <Form.Item
                name="password"
                className="custom-form transparent-background"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder=""
                />
            </Form.Item>

            <Form.Item className='buttons'>
                <Button type="primary" htmlType="submit" className="login-form-button custom-white-button">
                    Ingresar
                </Button>

                <Button type="secondary" htmlType="submit" className="login-form-button2 custom-white-color">
                    <Text underline color='white'>Olvide mi contraseña</Text>
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginComponent;
