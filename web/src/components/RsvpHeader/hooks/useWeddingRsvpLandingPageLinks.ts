import { useMemo } from 'react';

import { Data } from '@measured/puck';

import { useGetWeddingRsvpLandingPage } from 'src/pages/RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';

export const useWeddingRsvpLandingPageLinks = () => {
    const weddingRsvpLandingPageQuery = useGetWeddingRsvpLandingPage();

    const contentLinks = useMemo(() => {
        if (!weddingRsvpLandingPageQuery.weddingRsvpLandingPage) return [];
        const pageData = weddingRsvpLandingPageQuery.weddingRsvpLandingPage
            .pageBuilderData as Partial<Data>;

        const links = pageData.content?.map((block) => {
            if (!block.props?.settings?.navigationLabel) return;

            return {
                label: block.props.settings.navigationLabel ?? block.type,
                id: block.props.id,
            };
        });

        return links?.filter(Boolean);
    }, [weddingRsvpLandingPageQuery.weddingRsvpLandingPage]);

    return { contentLinks };
};
