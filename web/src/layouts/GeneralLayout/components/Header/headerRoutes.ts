export type NavigationDataType = {
    link?: {
        label: string;
        url: string;
    };
    nestedLinks?: {
        label: {
            label: string;
            url?: string;
        };
        links: Array<{
            label: string;
            url: string;
        }>;
    };
};

export const navigationData: NavigationDataType[] = [
    {
        link: {
            url: '/',
            label: 'Home',
        },
    },
    // {
    //     nestedLinks: {
    //         links: [
    //             {
    //                 label: 'Link 1',
    //                 url: '/',
    //             },
    //             {
    //                 label: 'Personal training',
    //                 url: '/',
    //             },
    //         ],
    //         label: {
    //             label: 'Personal training',
    //         },
    //     },
    // },
    {
        link: {
            label: 'Features',
            url: '/',
        },
    },
    {
        link: {
            label: 'Prijzen',
            url: '/',
        },
    },
    {
        link: {
            label: 'Over bruiloft buddy',
            url: '/',
        },
    },
];
