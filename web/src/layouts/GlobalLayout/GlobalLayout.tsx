import { useEffect } from 'react';

import { Toaster } from '@redwoodjs/web/dist/toast';

import { useAuth } from 'src/auth';

type GlobalLayoutProps = {
    children?: React.ReactNode;
};

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
    const { isAuthenticated, loading, hasRole } = useAuth();

    useEffect(() => {
        // if (!isAuthenticated) {
        //     toast.error(
        //         'You are not authenticated or do not have the required role!'
        //     );
        // }
        console.log('hasRole', hasRole('USER'));
    }, [isAuthenticated, loading]);

    return (
        <>
            <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
            {children}
        </>
    );
};

export default GlobalLayout;
