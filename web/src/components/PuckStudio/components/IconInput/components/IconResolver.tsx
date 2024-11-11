import React from 'react';

import { Icon, IconProps } from '@chakra-ui/react';
import * as icons from 'react-icons/fa6';
import { GiBigDiamondRing, GiPartyFlags } from 'react-icons/gi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { LuPartyPopper } from 'react-icons/lu';
import { MdQuestionMark } from 'react-icons/md';
import { MdOutlineWavingHand } from 'react-icons/md';
import { PiChampagneBold, PiForkKnifeBold } from 'react-icons/pi';

type IconResolverProps = {
    icon: string;
} & IconProps;

export const customIcons = {
    GiBigDiamondRing,
    GiPartyFlags,
    HiOutlineUserGroup,
    LuPartyPopper,
    MdOutlineWavingHand,
    PiChampagneBold,
    PiForkKnifeBold,
};

export const allBBIcons = {
    ...icons,
    ...customIcons,
};

const IconResolver = ({ icon, ...props }: IconResolverProps) => {
    const CurrentIcon =
        allBBIcons[icon as keyof typeof allBBIcons] ?? MdQuestionMark;

    return <Icon as={CurrentIcon} {...props} />;
};

export default IconResolver;
