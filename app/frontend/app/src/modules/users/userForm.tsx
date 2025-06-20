import React from 'react';
import { Form, Input, Button } from 'antd';

export default function UserForm() {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log('Datos del formulario:', values);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto' }}>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Ingresa el username' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Ingresa la contraseña' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Ingresa el email' },
            { type: 'email', message: 'Email no válido' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}