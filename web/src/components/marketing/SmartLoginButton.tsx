import React from 'react';

import { Button, ButtonProps, Flex, FlexProps } from '@chakra-ui/react';

import { routes, Link } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import RedwoodLink from '../RedwoodLink';
import { RedwoodLinkProps } from '../RedwoodLink/RedwoodLink';

type SmartLoginButtonProps = {
    loginLinkProps?: RedwoodLinkProps;
    signupButtonProps?: ButtonProps;
    loggedInButtonProps?: ButtonProps;
} & FlexProps;

const SmartLoginButton = ({
    loginLinkProps,
    signupButtonProps,
    loggedInButtonProps,
    ...props
}: SmartLoginButtonProps) => {
    const { currentUser, loading } = useAuth();
    if (currentUser)
        return (
            <Flex {...props}>
                <Button
                    as={Link}
                    to={routes.dashboard()}
                    colorScheme="secondary"
                    isLoading={loading}
                    isDisabled={loading}
                    {...loggedInButtonProps}
                >
                    Ga naar App
                </Button>
            </Flex>
        );
    return (
        <Flex
            flexDir={{
                base: 'column',
                lg: 'row',
            }}
            {...props}
        >
            <RedwoodLink
                to={routes.login()}
                colorScheme="primary"
                color="inherit"
                alignSelf="center"
                fontWeight="semibold"
                mx={4}
                textAlign="center"
                w={{
                    base: 'full',
                    lg: 'auto',
                }}
                mb={{
                    base: 4,
                    lg: 0,
                }}
                {...loginLinkProps}
            >
                {props.children ?? 'Inloggen'}
            </RedwoodLink>
            <Button
                as={Link}
                to={routes.signup()}
                colorScheme="secondary"
                isLoading={loading}
                isDisabled={loading}
                {...signupButtonProps}
            >
                {'Registreren'}
            </Button>
        </Flex>
    );
};

export default SmartLoginButton;
