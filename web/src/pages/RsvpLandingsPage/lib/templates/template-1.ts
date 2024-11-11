export const template1 = {
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
                id: 'VerticalSpace-39326d56-af2f-421f-857b-710c90066295',
                size: '80px',
            },
        },
        {
            type: 'StoryTimeLine',
            props: {
                id: 'StoryTimeLine-4d5c36c2-e6b3-4790-815a-eb2e37952ae3',
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
            type: 'Mvp',
            props: {
                id: 'Mvp-2b973942-a09f-4139-bb31-e625c88ab5cc',
                title: 'Getuigen',
                settings: {
                    containerWidth: '7xl',
                },
                subTitle: 'Maak kennis met onze:',
                witnesses: [
                    {
                        name: 'Getuige 1',
                        role: 'Getuige',
                    },
                    {
                        name: 'Getuige 2',
                        role: 'Getuige',
                    },
                    {
                        name: 'Getuige 3',
                        role: 'Getuige',
                    },
                    {
                        name: 'Getuige 4',
                        role: 'Getuige',
                    },
                ],
                textContent: {
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
                                    text: 'Ceremoniemeesters',
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
                                    text: 'Demi en Rowin zijn onze helden van deze dag, onze ceremoniemeesters.',
                                    type: 'text',
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
                                    text: 'Wil je iets vragen of doorgeven? Ze zijn te bereiken op:',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'center',
                            },
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Demi',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '',
                                                fontSize: '',
                                            },
                                        },
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                },
                                {
                                    text: ':',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '',
                                                fontSize: '',
                                            },
                                        },
                                    ],
                                },
                                {
                                    text: ' ',
                                    type: 'text',
                                },
                                {
                                    text: '+31612345678',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'link',
                                            attrs: {
                                                rel: 'noopener noreferrer nofollow',
                                                href: 'tel:+31612345678',
                                                class: null,
                                                target: '_blank',
                                            },
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
                                    text: 'Rowin',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '',
                                                fontSize: '',
                                            },
                                        },
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                },
                                {
                                    text: ':',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '',
                                                fontSize: '',
                                            },
                                        },
                                    ],
                                },
                                {
                                    text: ' ',
                                    type: 'text',
                                },
                                {
                                    text: '+31612345678',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'link',
                                            attrs: {
                                                rel: 'noopener noreferrer nofollow',
                                                href: 'tel:+31612345678',
                                                class: null,
                                                target: '_blank',
                                            },
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
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'center',
                            },
                            content: [
                                {
                                    text: 'Mocht je ons willen verrassen met een dansje, slechte grap of lieve woorden? ',
                                    type: 'text',
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
                                    text: 'Bespreek dit dan met onze ceremoniemeesters. Zij weten wat wij wel of niet willen op onze dag.',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
                mastersOfCeremony: [
                    {
                        name: 'Persoon 1',
                        role: 'Ceremoniemeester',
                    },
                    {
                        name: 'Persoon 2',
                        role: 'Ceremoniemeester',
                    },
                ],
                masterOfCeremonyTitle: 'Ceremoniemeesters',
            },
        },
        {
            type: 'VerticalSpace',
            props: {
                id: 'VerticalSpace-e6bfa411-17b4-4d2d-ade1-c8479959ec9d',
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
            type: 'VerticalSpace',
            props: {
                id: 'VerticalSpace-585c5d93-eb9e-4afe-9a07-021796e327dd',
                size: '80px',
            },
        },
        {
            type: 'TextImage',
            props: {
                id: 'TextImage-37267eb8-6726-4a7f-884d-a0b80a7b6c12',
                bgSize: 'cover',
                settings: {
                    containerWidth: '7xl',
                },
                imageFirst: true,
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
                                    text: 'Onze locatie',
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
                                    text: 'In de buurt van Utrecht ligt Buitenplaats Amerongen. Met een mooi landgoed, de kasteeltuinen, en historische bijgebouwen, het koetshuis en het poortgebouw, voelde het voor ons als een bijzondere locatie, de locatie waar wij willen trouwen!',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Buitenplaats Amerongen',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'link',
                                            attrs: {
                                                rel: 'noopener',
                                                href: 'https://swijnenburg.com/locatie/buitenplaats-amerongen/',
                                                class: 'chakra-link css-o3anmf',
                                                target: '_blank',
                                            },
                                        },
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '#6e5744',
                                                fontSize: '',
                                            },
                                        },
                                        {
                                            type: 'bold',
                                        },
                                    ],
                                },
                                {
                                    type: 'hardBreak',
                                },
                                {
                                    text: 'Drostestraat 12,',
                                    type: 'text',
                                },
                                {
                                    type: 'hardBreak',
                                },
                                {
                                    text: '3958 BK Amerongen',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                        },
                        {
                            type: 'heading',
                            attrs: {
                                level: 2,
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Cadeautip',
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
                                    text: 'Wij zouden graag deze onvergetelijke dag afsluiten met een mooie huwelijksreis. Mocht je ons een cadeau willen geven, dan is een bijdrage aan onze huwelijksreis meer dan welkom.',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
                assetPositioning: 'cover',
            },
        },
        {
            type: 'VerticalSpace',
            props: {
                id: 'VerticalSpace-3f14b6e2-b73e-45b3-bb8a-5d4392da05c8',
                size: '80px',
            },
        },
        {
            type: 'TextImage',
            props: {
                id: 'TextImage-e97e2321-dd72-4957-8de6-73b00a3400e0',
                bgSize: 'cover',
                settings: {
                    containerWidth: '7xl',
                },
                imageFirst: false,
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
                                    text: 'Overnachting',
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
                                    text: "In de buurt zijn veel B&B's, hotels en vakantieparken. Voor wie het wil, boek alvast een heerlijke overnachting want wij beloven: er staan genoeg drankjes klaar deze avond! En hoe fijn (en leuk) is het dan als je niet naar huis hoeft te rijden. Taxi's en OV zijn natuurlijk ook opties!",
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Bij Van der Valk Veenendaal hebben wij een korting kunnen regelen. Dit hotel ligt op +/- 15 minuten rijden van de locatie. Boek via de onderstaande knop en gebruik de kortingscode:',
                                    type: 'text',
                                },
                                {
                                    type: 'hardBreak',
                                },
                                {
                                    text: 'VEE-GF24322',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'textStyle',
                                            attrs: {
                                                color: '',
                                                fontSize: '',
                                            },
                                        },
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
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Deze korting is exclusief voor de optie kamer met ontbijt & annulering',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    type: 'button',
                                    attrs: {
                                        href: 'http://www.hotelveenendaal.com/acties?voucher=VEE-GF24322',
                                        text: 'Boek via de link',
                                        target: '_blank',
                                        textColor: '#ffffff',
                                        buttonColor: '#9c8774',
                                    },
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
                                    text: 'Of bekijk de mogelijkheden via ',
                                    type: 'text',
                                },
                                {
                                    text: 'deze',
                                    type: 'text',
                                    marks: [
                                        {
                                            type: 'link',
                                            attrs: {
                                                rel: 'noopener',
                                                href: 'https://swijnenburg.com/trouwen/ontzorgen/overnachten/',
                                                class: 'chakra-link css-o3anmf',
                                                target: '_blank',
                                            },
                                        },
                                    ],
                                },
                                {
                                    text: ' link van Buitenplaats Amerongen',
                                    type: 'text',
                                },
                            ],
                        },
                    ],
                },
                assetPositioning: 'cover',
            },
        },
        {
            type: 'VerticalSpace',
            props: {
                id: 'VerticalSpace-40df383d-d8ba-4b98-9b56-1b883af37adb',
                size: '80px',
            },
        },
        {
            type: 'TextImage',
            props: {
                id: 'TextImage-533dce2a-7beb-4d41-ab29-b0dbcfa48873',
                bgSize: 'cover',
                settings: {
                    containerWidth: '7xl',
                },
                imageFirst: true,
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
                                    text: 'Dresscode',
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
                                    text: "Zoals de meeste van jullie weten is Demi gék op beige, beige en nog is beige. Nou dat gaan we niet van jullie vragen hoor! Natuurlijk moet je dragen wat voor jou prettig is, maar als wij mee mogen denken over deze outfit zouden we het leuk vinden als je iets uitzoekt in 'pastel chique'. Wat is dat dan?",
                                    type: 'text',
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
                                    text: 'Nou gewoon iets moois wat je draagt naar een bruiloft in het kleurenpallet zoals hierboven. We zouden het kunnen waarderen als je niet in het zwart, wit of rood komt.',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                            content: [
                                {
                                    text: 'Heb je inspiratie nodig, bekijk dan hier voorbeelden:',
                                    type: 'text',
                                },
                            ],
                        },
                        {
                            type: 'paragraph',
                            attrs: {
                                textAlign: 'left',
                            },
                        },
                        {
                            type: 'bulletList',
                            content: [
                                {
                                    type: 'listItem',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: {
                                                textAlign: 'left',
                                            },
                                            content: [
                                                {
                                                    text: 'Vrouwen',
                                                    type: 'text',
                                                    marks: [
                                                        {
                                                            type: 'link',
                                                            attrs: {
                                                                rel: 'noopener noreferrer nofollow',
                                                                href: 'https://www.google.com/search?q=pastelkleuren+bruiloft+kleding+vrouwen&tbm=isch&ved=2ahUKEwjz_4PkgIWBAxW5h_0HHUdaAlgQ2-cCegQIABAA&oq=pastelkleuren+bruiloft+kleding+vrouwen&gs_lcp=CgNpbWcQAzoGCAAQCBAeUNkBWPcVYIwXaAJwAHgAgAGiAYgBpQuSAQQwLjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=i4nvZLOOD7mP9u8Px7SJwAU&bih=972&biw=1400',
                                                                class: null,
                                                                target: '_blank',
                                                            },
                                                        },
                                                    ],
                                                },
                                                {
                                                    text: ' ',
                                                    type: 'text',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: 'listItem',
                                    content: [
                                        {
                                            type: 'paragraph',
                                            attrs: {
                                                textAlign: 'left',
                                            },
                                            content: [
                                                {
                                                    text: 'Mannen',
                                                    type: 'text',
                                                    marks: [
                                                        {
                                                            type: 'link',
                                                            attrs: {
                                                                rel: 'noopener noreferrer nofollow',
                                                                href: 'https://www.google.com/search?q=pastelkleuren+bruiloft+kleding+mannen&tbm=isch&ved=2ahUKEwjD-ZabgYWBAxWwi_0HHYmhDcUQ2-cCegQIABAA&oq=pastelkleuren+bruiloft+kleding+mannen&gs_lcp=CgNpbWcQA1DZBViXCmDYC2gAcAB4AIABlAGIAe8HkgEDMC43mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=_onvZMOCN7CX9u8PicO2qAw&bih=972&biw=1400',
                                                                class: null,
                                                                target: '_blank',
                                                            },
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                assetPositioning: 'cover',
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
