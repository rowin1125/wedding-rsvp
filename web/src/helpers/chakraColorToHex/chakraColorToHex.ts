import theme from 'config/chakra.config';

export const chakraColorToHex = (color: string) => {
    const colors = theme.colors;
    if (!color.includes('.')) return colors.primary[500];

    const [colorName, number] = color.split('.');
    if (!colorName || !number) return colors.primary[500];

    const colorTheme = colors[colorName as keyof typeof colors];
    const colorHex = colorTheme[parseInt(number) as keyof typeof colorTheme];

    if (!colorHex) return colors.primary[500];

    return colorHex;
};
