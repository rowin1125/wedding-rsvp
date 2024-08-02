import { FaUser } from 'react-icons/fa6';
import { HiUserGroup } from 'react-icons/hi';
import { RiGroupFill } from 'react-icons/ri';

export const getPeopleIcon = (total: number) => {
    switch (total) {
        case 1:
            return FaUser;

        case 2:
            return RiGroupFill;

        default:
            return HiUserGroup;
    }
};
