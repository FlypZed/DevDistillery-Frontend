import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';

const HeroPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '60vh',
                    padding: '1em',
                    boxSizing: 'border-box',
                    color: 'white',
                    background: 'url(https://images.unsplash.com/photo-1597290282695-edc43d0e7129) center center no-repeat',
                    backgroundSize: 'cover',
                    textAlign: 'center',
                }}
            >
                <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '12vh', sm: '16vh' },
                            lineHeight: 1.2,
                            marginBottom: '0.5em',
                        }}
                    >
                        DevDistillery
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            lineHeight: 1.5,
                            marginBottom: '1.5em',
                        }}
                    >
                        La plataforma definitiva para gestionar tus proyectos y tareas de desarrollo
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleLoginClick}
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            padding: '0.5em 2em', // Ajusta el padding del botón
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>

            <Container
                maxWidth="md"
                sx={{
                    textAlign: 'left',
                    padding: '2em 1em',
                }}
            >
                <Box sx={{ marginBottom: '2em' }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            marginBottom: '1em',
                        }}
                    >
                        Some additional content
                    </Typography>
                    <Typography
                        paragraph
                        sx={{
                            lineHeight: 1.6,
                            marginBottom: '1.5em',
                        }}
                    >
                        The rest of the page content continues below the hero. You can use the hero at the top of your page, e.g. the home page. A hero is great to display a high-quality picture together with a tasty title.
                    </Typography>
                    <Typography
                        paragraph
                        sx={{
                            lineHeight: 1.6,
                            marginBottom: '1.5em',
                        }}
                    >
                        Ad donec tincidunt torquent ultricies convallis sodales faucibus magna, fringilla lorem blandit sollicitudin donec faucibus curae orci molestie, et proin curae aliquet venenatis ligula amet vivamus orci varius arcu.
                    </Typography>
                    <Typography
                        paragraph
                        sx={{
                            lineHeight: 1.6,
                            marginBottom: '1.5em',
                        }}
                    >
                        Laoreet fusce condimentum venenatis quisque imperdiet ornare cras faucibus convallis, pharetra habitasse elementum ut bibendum per sociosqu phasellus etiam, velit faucibus integer torquent leo elementum maecenas netus.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default HeroPage;