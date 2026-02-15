import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Logika Login Sederhana (Simulasi)
    if (email === 'admin@rumahsukses.com' && password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('adminEmail', email);
      navigate('/dashboard');
    } else {
      setError('Email atau password salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light py-5">
      <Container>
        <Row className="justify-content-center">
          <Col xs={11} sm={9} md={7} lg={5} xl={4}>
            <Card className="login-card p-3 shadow-sm mt-5">
              <Card.Body>
                {/* BAGIAN LOGO: Diletakkan paling atas dan dicenterkan */}
                <div className="text-center mb-4">
                  <img 
                    src="public/assets/logo.jpeg" 
                    alt="Logo Bimbelku" 
                    className="mb-3 shadow-sm"
                    style={{ 
                      width: '75px', 
                      height: '75px', 
                      objectFit: 'cover', 
                      borderRadius: '5px',
                      border: '2px solid #f8fafc'
                    }} 
                  />
                </div>

                <div className="text-center mb-4">
                  <h3 className="fw-bold mb-0">
                    Bimbelku <span className="text-rs-orange">Rumah Sukses</span>
                  </h3>
                  <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>Admin Portal</p>
                </div>

                <div className="mb-4 text-center">
                  <h6 className="fw-bold mb-1">Selamat Datang Kembali 👋</h6>
                  <p className="welcome-text mb-0">Silakan masukkan kredensial admin Anda untuk melanjutkan.</p>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 px-3 small text-center mb-3" style={{ borderRadius: '10px', fontSize: '0.8rem' }}>
                    {error}
                  </div>
                )}

                <Form onSubmit={handleSubmit}>
                  <CustomInput 
                    label="Admin Email" 
                    type="email" 
                    placeholder="admin@rumahsukses.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  
                  <CustomInput 
                    label="Password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox" label="Ingat saya" style={{ fontSize: '0.8rem' }} />
                    <a href="#" className="text-rs-orange text-decoration-none fw-semibold" style={{ fontSize: '0.8rem', color: '#f97316' }}>Forgot Password?</a>
                  </div>

                  <Button type="submit" className="w-100 btn-login mb-4" style= {{ backgroundColor: '#f97316', border: 'none', fontSize: '1rem', padding: '10px' }}>
                    Login →
                  </Button>

                  <div className="text-center text-tiny text-uppercase">
                    INTERNAL ADMINISTRATOR ACCESS ONLY
                    <div className="mt-1 opacity-75">© 2026 Bimbelku Rumah Sukses • v1.0.0</div>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;