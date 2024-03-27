import React from 'react';

import { Button, ButtonProps } from '@chakra-ui/react';

import { routes, Link } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

type SmartLoginButtonProps = ButtonProps;

const SmartLoginButton = (props: SmartLoginButtonProps) => {
    const { currentUser } = useAuth();
    if (currentUser)
        return (
            <Button
                as={Link}
                to={routes.dashboard()}
                colorScheme="secondary"
                {...props}
            >
                Ga naar dashboard
            </Button>
        );
    return (
        <Button
            as={Link}
            to={routes.signup()}
            colorScheme="secondary"
            {...props}
        >
            {props.children}
        </Button>
    );
};

export default SmartLoginButton;
