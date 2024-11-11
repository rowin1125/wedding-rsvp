export const template2 = {
    root: {
        props: {},
    },
    zones: {},
    content: [
        {
            type: 'Hero',
            props: {
                id: 'Hero-459da3ae-beb5-47fb-bc6b-ecab6a153d6b',
                title: 'Wij gaan trouwen!',
                height: 600,
                settings: {
                    topSpacing: 'none',
                    bottomSpacing: 'none',
                    containerWidth: 'full',
                },
                subtitle: 'Demi & Rowin',
            },
        },
        {
            type: 'CountDown',
            props: {
                id: 'CountDown-4fceb1e9-1c86-4ea9-b1d2-523711a1ae45',
                date: '2025-10-05',
                settings: {
                    topSpacing: 'none',
                    bottomSpacing: 'none',
                    containerWidth: '7xl',
                },
            },
        },
        {
            type: 'VerticalSpace',
            props: {
                id: 'VerticalSpace-39326d56-af2f-421f-857b-710c90066295',
                size: '80px',
            },
        },
        {
            type: 'StoryTimeLine',
            props: {
                id: 'StoryTimeLine-4d5c36c2-e6b3-4790-815a-eb2e37952ae3',
                stories: [
                    {
                        icon: 'FaRegHeart',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 2,
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: '2015',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 2,
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: 'Onze ontmoeting',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'GiBigDiamondRing',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 2,
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: '2023',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 2,
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: 'Het aanzoek',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'FaRegCalendarCheck',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 2,
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: '2024',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 2,
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: 'Save the date',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'left',
                                    },
                                    content: [
                                        {
                                            text: 'En op 16 mei 2024 willen wij onze trouwdag met jullie vieren! Een dag vol liefde, gezelligheid, lachen, lekker eten en feesten. Wij kijken er enorm naar uit. Scroll verder voor meer informatie.',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
                settings: {
                    containerWidth: '7xl',
                },
                intro: {
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    type: 'text',
                                    text: 'Lees hier de verhalen van onze bruiloft',
                                },
                            ],
                        },
                        {
                            type: 'heading',
                            attrs: {
                                textAlign: 'center',
                                level: 2,
                            },
                            content: [
                                {
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                    text: 'Onze verhalen',
                                },
                            ],
                        },
                    ],
                },
            },
        },
        {
            type: 'Banner',
            props: {
                id: 'Banner-2e595531-b496-4131-90fa-6d4f87d6f986',
                text: {
                    type: 'doc',
                    content: [
                        {
                            type: 'heading',
                            attrs: {
                                level: 2,
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'We kijken er naar uit om deze mooie dag samen met jullie te vieren!',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'italic',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                settings: {
                    containerWidth: '5xl',
                },
            },
        },
        {
            type: 'VerticalSpace',
            props: {
                id: 'VerticalSpace-72b6a41a-05a4-44b7-bdde-16cb37314215',
                size: '80px',
            },
        },
        {
            type: 'TimeTable',
            props: {
                id: 'TimeTable-435936d0-adcd-4100-996e-04cf610e3840',
                settings: {
                    containerWidth: '7xl',
                },
                programItem: [
                    {
                        icon: 'FaUserGroup',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: 'Ontvangst',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '14:00',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'GiBigDiamondRing',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: 'Ceremonie',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '14:30',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'LuPartyPopper',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: 'Toost',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '15:15',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'PiChampagneBold',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: "Borrel & foto's",
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '15:15',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'PiForkKnifeBold',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: 'Diner',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '17:30',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'GiPartyFlags',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: 'Feest',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '20:30',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    {
                        icon: 'MdOutlineWavingHand',
                        textContent: {
                            type: 'doc',
                            content: [
                                {
                                    type: 'heading',
                                    attrs: {
                                        level: 4,
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: 'Uitzwaaien',
                                            type: 'text',
                                            marks: [
                                                {
                                                    type: 'bold',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: {
                                        textAlign: 'center',
                                    },
                                    content: [
                                        {
                                            text: '01:00',
                                            type: 'text',
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ],
                textContent: {
                    type: 'doc',
                    content: [],
                },
            },
        },
        {
            type: 'RsvpForm',
            props: {
                id: 'RsvpForm-99240fee-1dfa-4197-9d1c-f77502a5ba46',
                bgSize: 'cover',
                settings: {
                    containerWidth: 'full',
                },
                textContent: {
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                        },
                    ],
                },
            },
        },
    ],
};
