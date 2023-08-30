import { extendTheme } from '@chakra-ui/react';

import { Button } from './components/ButtonTheme';
import { Card } from './components/CardTheme';
import { Container } from './components/containerTheme';
import { Heading } from './components/heading';
import { Input } from './components/InputTheme';
import { Link } from './components/link';
import { Text } from './components/text';
import { Textarea } from './components/Textarea';
import { colors } from './foundation/colors';
import { fonts, fontWeights } from './foundation/fonts';

const theme = extendTheme({
    fonts,
    fontWeights,
    colors,
    components: {
        Text,
        Heading,
        Link,
        Container,
        Button,
        Card,
        Input,
        Textarea,
    },
});

export default theme;
