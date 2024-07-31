export const getSeason = (initialDate: string) => {
    const seasonsOfTheYear = {
        WINTER: 'WINTER',
        SPRING: 'SPRING',
        SUMMER: 'SUMMER',
        AUTUMN: 'AUTUMN',
    };
    const date = new Date(initialDate);
    const month = date.getMonth() ?? 0;

    switch (month) {
        case 0:
        case 1:
        case 11:
            return seasonsOfTheYear.WINTER;

        case 2:
        case 3:
        case 4:
            return seasonsOfTheYear.SPRING;
        case 5:
        case 6:
        case 7:
            return seasonsOfTheYear.SUMMER;
        case 8:
        case 9:
        case 10:
            return seasonsOfTheYear.AUTUMN;

        default:
            return seasonsOfTheYear.SUMMER;
    }
};
