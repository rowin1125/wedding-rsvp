import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import theme from 'config/chakra.config';

import { RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import possibleTypes from 'src/graphql/possibleTypes';
import Sentry from 'src/lib/sentry';
import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import './scaffold.css';
import { AuthProvider, useAuth } from './auth';

import './index.css';

const extendedTheme = extendTheme(theme);

const graphQLClientConfig = {
    cacheConfig: {
        possibleTypes: possibleTypes.possibleTypes,
    },
};

const App = () => (
    <Sentry.ErrorBoundary fallback={FatalErrorPage}>
        <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
            <AuthProvider>
                <ColorModeScript />
                <ChakraProvider
                    theme={extendedTheme}
                    toastOptions={{
                        defaultOptions: {
                            position: 'top',
                            duration: 4000,
                            isClosable: true,
                        },
                    }}
                >
                    <RedwoodApolloProvider
                        useAuth={useAuth}
                        graphQLClientConfig={graphQLClientConfig}
                    >
                        <Routes />
                    </RedwoodApolloProvider>
                </ChakraProvider>
            </AuthProvider>
        </RedwoodProvider>
    </Sentry.ErrorBoundary>
);

export default App;
