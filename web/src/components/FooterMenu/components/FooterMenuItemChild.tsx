import React from 'react';

import { Button, Divider, Flex, Icon, MenuItem } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { CgChevronRight } from 'react-icons/cg';

import RedwoodLink from 'src/components/RedwoodLink';

type FooterMenuItemChildProps = {
  children: React.ReactNode;
  to: string;
  divider?: boolean;
  icon: IconType;
};

const FooterMenuItemChild = ({
  children,
  to,
  divider = true,
  icon,
  ...props
}: FooterMenuItemChildProps) => {
  const hasIcon = !!icon;
  const CustomIcon = icon;

  return (
    <>
      <MenuItem p={0} {...props} borderColor="primary.900">
        <Button
          py={8}
          colorScheme="primary"
          as={RedwoodLink}
          to={to}
          w="full"
          borderRadius={0}
        >
          <Flex justifyContent="space-between" w="full">
            <Flex alignItems="center">
              {hasIcon && <Icon mr={2} as={CustomIcon} />}
              {children}
            </Flex>
            <Icon as={CgChevronRight} ml={4} />
          </Flex>
        </Button>
      </MenuItem>
      {divider && <Divider bg="primary.900" />}
    </>
  );
};

export default FooterMenuItemChild;
