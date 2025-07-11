import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function LoginPopup({ show, onClose }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    const handleSignup = () => {
        onClose();
        navigate('/signup');
    };
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="static"
            style={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Modal.Header
                closeButton
                style={{
                    border: 'none',
                    paddingBottom: '0',
                    paddingTop: '24px'
                }}
            >
                <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: '#f0f7ff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FaLock style={{ color: '#387ed1', fontSize: '20px' }} />
                        </div>
                    </div>
                    <h5 style={{
                        fontWeight: '600',
                        color: '#2a2a2a',
                        fontSize: '18px',
                        marginBottom: '0'
                    }}>
                        Login Required
                    </h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                textAlign: 'center',
                padding: '16px 24px',
                color: '#666666',
                lineHeight: '1.5',
                marginBottom: '8px'
            }}>
                <p style={{ marginBottom: '24px' }}>
                    You need to be logged in to access Kite. Please sign in to your Zerodha account to continue.
                </p>
                <Button
                    variant="primary"
                    onClick={handleLogin}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontWeight: '600',
                        backgroundColor: '#387ed1',
                        borderColor: '#387ed1',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}
                >
                    Go to Login
                </Button>
            </Modal.Body>
            <Modal.Footer style={{
                border: 'none',
                justifyContent: 'center',
                paddingTop: '0',
                paddingBottom: '20px',
                fontSize: '13px'
            }}>
                <span
                    onClick={handleSignup}
                    style={{
                        color: '#387ed1',
                        textDecoration: 'none',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                >
                    Sign up
                </span>

            </Modal.Footer>
        </Modal>
    );
}

export default LoginPopup;