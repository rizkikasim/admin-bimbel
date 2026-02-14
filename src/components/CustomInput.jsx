import React from 'react';
import { Form } from 'react-bootstrap';

const CustomInput = ({ label, type, placeholder, value, onChange }) => (
  <Form.Group className="mb-3 text-start">
    <Form.Label className="small fw-bold text-secondary">{label}</Form.Label>
    <Form.Control 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      className="py-2 px-3"
      style={{ borderRadius: '10px', border: '1px solid #dee2e6' }}
      required
    />
  </Form.Group>
);

export default CustomInput;