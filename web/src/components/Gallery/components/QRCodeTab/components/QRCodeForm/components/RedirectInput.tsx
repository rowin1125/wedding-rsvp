import React from 'react';

import { Button, Icon, useClipboard, useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { MdContentCopy } from 'react-icons/md';
import { TbCheck } from 'react-icons/tb';

import InputControl from 'src/components/react-hook-form/components/InputControl';

const RedirectInput = () => {
    const { watch } = useFormContext();
    const redirectUrl = watch('redirectUrl');
    const toast = useToast();

    const { hasCopied, onCopy } = useClipboard(redirectUrl);

    const handleCopy = () => {
        onCopy();
        toast({
            title: 'Link gekopieerd naar klembord',
            status: 'success',
        });
    };
    return (
        <InputControl
            name="redirectUrl"
            isRequired
            inputProps={{
                isDisabled: true,
            }}
            label="Link naar het album"
            rightElement={
                <>
                    <Button onClick={handleCopy} ml={2} color="white">
                        {hasCopied ? (
                            <Icon as={TbCheck} color="white" />
                        ) : (
                            <Icon as={MdContentCopy} color="white" />
                        )}
                    </Button>
                </>
            }
        />
    );
};

export default RedirectInput;
