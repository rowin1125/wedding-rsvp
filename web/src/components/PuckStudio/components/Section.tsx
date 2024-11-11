import { ReactNode } from 'react';

import { BoxProps, Container } from '@chakra-ui/react';

export type SectionProps = {
    children: ReactNode;
} & BoxProps;

export const Section = ({ children, ...props }: SectionProps) => {
    return <Container {...props}>{children}</Container>;
};
