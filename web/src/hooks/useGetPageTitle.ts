import { useLocation } from '@redwoodjs/router';

import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';

const unSlugify = (slug: string) => {
    return slug.replace(/-/g, ' ');
};

export const useGetPageTitle = () => {
    const { pathname } = useLocation();

    const segmentedPathname = pathname.split('/');
    const pageTitle = unSlugify(
        segmentedPathname[segmentedPathname.length - 1]
    );

    return { pageTitle: capitalizeText(pageTitle) };
};
