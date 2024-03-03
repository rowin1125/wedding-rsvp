import React from 'react';

import {
    Box,
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    FormLabelProps,
    Input,
    InputGroup,
    InputLeftAddon,
    InputProps,
    InputRightAddon,
    InputRightElement,
    Progress,
    Text,
} from '@chakra-ui/react';
import { ZxcvbnResult } from '@zxcvbn-ts/core';
import { useField } from 'formik';
import Image from 'next/image';

import CheckIcon from '@/images/icons/checkIcon.svg';
import useTranslation from '@/src/hooks/useTranslation/useTranslation';
import forms from '@/src/localization/forms';

type ControlledPasswordInputProps = {
    label?: string;
    helperText?: string;
    id: string;
    labelProps?: FormLabelProps;
    inputRightAddonText?: string;
    inputLeftAddonText?: string;
    formControlProps?: FormControlProps;
    isHidden?: boolean;
    scoreResult?: ZxcvbnResult | null;
    strengthColor?: string;
} & InputProps;

const SCORE_MAP = {
    0: forms.passwordBad,
    1: forms.passwordWeak,
    2: forms.passwordMediocre,
    3: forms.passwordAverage,
    4: forms.passwordStrong,
};

const PASSWORD_STRENGTH_COLOR = ['red', 'orange', 'yellow', 'teal', 'success'];

const ControlledPasswordInput = ({
    label,
    helperText,
    id,
    labelProps,
    inputRightAddonText,
    inputLeftAddonText,
    formControlProps,
    isHidden,
    scoreResult,
    isRequired,
    ...props
}: ControlledPasswordInputProps) => {
    const [field, meta, { setTouched }] = useField(id);
    const { t } = useTranslation();

    const isInvalid = !!meta.error && meta.touched;
    const isValid = !meta.error && meta.touched;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        field.onChange(e);
        setTouched(true);
    };
    let errorMessage = meta.error;
    const strengthColor = PASSWORD_STRENGTH_COLOR[scoreResult?.score || 0];

    if (errorMessage === t(forms.passwordStrengthPlaceholder)) {
        errorMessage = t(forms.passwordStrengthScore, {
            strength: t(SCORE_MAP[scoreResult?.score || 0]),
        });
    }

    return (
        <FormControl
            isInvalid={isInvalid}
            mb={4}
            w="full"
            hidden={isHidden}
            isRequired={isRequired}
            {...formControlProps}
        >
            <FormLabel htmlFor={id} {...labelProps}>
                {label}
            </FormLabel>
            <InputGroup>
                {inputLeftAddonText && (
                    <InputLeftAddon>{inputLeftAddonText}</InputLeftAddon>
                )}
                <Input
                    id={id}
                    type="password"
                    color="black"
                    borderColor={isValid ? 'success.500' : 'gray.200'}
                    {...field}
                    {...props}
                    onChange={onChange}
                />
                <InputRightElement
                    transform={
                        inputRightAddonText ? 'translateX(-40px)' : 'none'
                    }
                >
                    {isValid && (
                        <Image
                            alt="Valid input"
                            src={CheckIcon}
                            aria-hidden={true}
                            width={20}
                            height={20}
                        />
                    )}
                </InputRightElement>
                {inputRightAddonText && (
                    <InputRightAddon>{inputRightAddonText}</InputRightAddon>
                )}
            </InputGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {field.value &&
                (scoreResult?.score === 0 ||
                    (scoreResult?.score && scoreResult?.score > 0)) && (
                    <>
                        <Box mt={4}>
                            <Progress
                                value={scoreResult?.score * 20 + 20 || 0}
                                h="4px"
                                rounded="5px"
                                colorScheme={strengthColor}
                            />
                        </Box>
                        {scoreResult?.score === 4 && (
                            <Text mt={2} color="success.500" fontSize="sm">
                                {t(forms.passwordStrengthScore, {
                                    strength: t(forms.passwordStrong),
                                })}
                            </Text>
                        )}
                    </>
                )}

            <FormErrorMessage fontSize="sm">{errorMessage}</FormErrorMessage>
        </FormControl>
    );
};

export default ControlledPasswordInput;
