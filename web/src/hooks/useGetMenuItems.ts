import { useMemo } from 'react';

import { IconType } from 'react-icons';
import { BiSun, BiPhotoAlbum } from 'react-icons/bi';
import { BsCardChecklist, BsFillMoonStarsFill } from 'react-icons/bs';
import { CgOptions, CgWebsite } from 'react-icons/cg';
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
                        to: routes.dayGuests(),
                        showOnMobile: true,
                    },
                    {
                        label: "Landingspagina's",
                        icon: CgWebsite,
                        to: routes.dayGuests(),
                        showOnMobile: true,
                    },
                    {
                        label: 'Dag gasten',
                        icon: BiSun,
                        to: routes.dayGuests(),
                        showOnMobile: true,
                    },
                    {
                        label: 'Avond gasten',
                        icon: BsFillMoonStarsFill,
                        to: routes.eveningGuests(),
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
