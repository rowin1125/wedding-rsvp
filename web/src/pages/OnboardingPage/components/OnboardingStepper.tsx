import React from 'react';

import {
    Stepper,
    Step,
    Box,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
} from '@chakra-ui/react';

import { useIsDevice } from 'src/hooks/useIsDevice';

type OnboardingStepperProps = {
    activeStep: number;
    handleStepClick: (index: number) => void;
    steps: { title: string; description: string }[];
};

const OnboardingStepper = ({
    activeStep,
    handleStepClick,
    steps,
}: OnboardingStepperProps) => {
    const { isDesktop } = useIsDevice();
    return (
        <Stepper
            mt={10}
            colorScheme="secondary"
            index={activeStep}
            orientation={isDesktop ? 'horizontal' : 'vertical'}
            gap={isDesktop ? 4 : 0}
        >
            {steps.map((step, index) => {
                const canNavigate = index <= activeStep;

                return (
                    <Step key={index}>
                        <Box
                            onClick={() => handleStepClick(index)}
                            width="100%"
                            height="100%"
                            display="flex"
                            alignItems={{ lg: 'center' }}
                            cursor={canNavigate ? 'pointer' : 'not-allowed'}
                            title={
                                canNavigate
                                    ? `Klik om naar stap ${index + 1} te gaan`
                                    : 'Voltooi de huidige stap om verder te gaan'
                            }
                        >
                            <StepIndicator
                                mr={2}
                                sx={{
                                    '[data-status=complete] &': {
                                        background: 'green.500',
                                        borderColor: 'green.700',
                                    },
                                }}
                            >
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>
                                    {step.description}
                                </StepDescription>
                            </Box>

                            <StepSeparator />
                        </Box>
                    </Step>
                );
            })}
        </Stepper>
    );
};

export default OnboardingStepper;
