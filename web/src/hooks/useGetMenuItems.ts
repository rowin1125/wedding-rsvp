import { useMemo } from 'react';

import { IconType } from 'react-icons';
import { BiPhotoAlbum } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { CgOptions } from 'react-icons/cg';
import { IoIosPeople } from 'react-icons/io';
import { MdOutlinePermMedia } from 'react-icons/md';
import { RiDashboard3Line } from 'react-icons/ri';

import { routes } from '@redwoodjs/router';

type UseGetMenuItemsReturnType = {
    label: string;
    icon: IconType;
    to: string;
    showOnMobile: boolean;
    children?: UseGetMenuItemsReturnType[];
};

export const useGetMenuItems = (): UseGetMenuItemsReturnType[] => {
    const menuList = useMemo(
        () => [
            {
                label: 'Dashboard',
                icon: RiDashboard3Line,
                to: routes.dashboard(),
                showOnMobile: true,
            },
            {
                label: 'Gasten',
                icon: IoIosPeople,
                to: routes.dashboard(),
                showOnMobile: true,
                children: [
                    {
                        label: 'Gastenlijst',
                        icon: BsCardChecklist,
                        to: routes.guestsList(),
                        showOnMobile: true,
                    },
                    {
                        label: "Rsvp Landingspagina's",
                        icon: BsCardChecklist,
                        to: routes.rsvpLandings(),
                        showOnMobile: true,
                    },
                ],
            },
            {
                label: 'Galerij',
                icon: BiPhotoAlbum,
                to: routes.galleries(),
                showOnMobile: true,
            },
            {
                label: 'Bestanden',
                icon: MdOutlinePermMedia,
                to: routes.media(),
                showOnMobile: true,
            },
            {
                label: 'Instellingen',
                icon: CgOptions,
                to: routes.weddingSettings(),
                showOnMobile: true,
            },
        ],
        []
    );

    return menuList;
};
