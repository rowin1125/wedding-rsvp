import { useEffect, useState } from 'react';

import { useSteps, useToast } from '@chakra-ui/react';

import { usePageLoadingContext, navigate, routes } from '@redwoodjs/router';

import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { CustomDate } from 'src/lib/CustomDate';

import {
    initialDevFormValues,
    WeddingFormContextType,
} from '../context/WeddingFormContext';

export const useOnboarding = () => {
    const { wedding, loading: weddingLoading } = useGetWeddingById();
    const toast = useToast();
    const hasWedding = !!wedding?.id;
    const { loading } = usePageLoadingContext();

    useEffect(() => {
        if (!hasWedding || loading || weddingLoading) return;

        navigate(routes.dashboard(), { replace: true });
        toast({
            title: 'Je hebt al een bruiloft aangemaakt 🤔',
            description: 'We sturen je door naar je dashboard',
            status: 'info',
        });
    }, [hasWedding, loading, toast, weddingLoading]);

    const steps = [
        { title: 'Bruiloft 📊', description: 'Bruiloft gegevens' },
        { title: 'Bruidspaar 💑', description: 'Jullie gegevens' },
        { title: 'Dagdelen 🌞🌙', description: 'Onderdelen bruiloft' },
    ];

    const initialGlobalFormState = useState<
        WeddingFormContextType['formValues']
    >(
        process.env.NODE_ENV === 'development'
            ? initialDevFormValues
            : {
                  name: '',
                  date: new Date().toISOString().split('T')[0],
                  partners: [
                      {
                          firstName: '',
                          lastName: '',
                          gender: 'MALE',
                          type: 'GROOM',
                      },
                      {
                          firstName: '',
                          lastName: '',
                          gender: 'FEMALE',
                          type: 'BRIDE',
                      },
                  ],
                  dayParts: [
                      {
                          startTime: new CustomDate(
                              new Date()
                          ).formatForInput(),
                          endTime: new CustomDate(new Date()).formatForInput(),
                          name: '',
                          description: '',
                      },
                  ],
              }
    );

    const stepControls = useSteps({
        index: process.env.NODE_ENV === 'development' ? 2 : 0,
        count: steps.length,
    });

    const handleStepClick = (index: number) => {
        if (index > stepControls.activeStep) return;

        stepControls.setActiveStep(index);
    };

    const handleNext = () => {
        stepControls.setActiveStep(stepControls.activeStep + 1);
    };

    const handlePrevious = () => {
        stepControls.setActiveStep(stepControls.activeStep - 1);
    };

    return {
        steps,
        stepControls,
        initialGlobalFormState,
        handleStepClick,
        handleNext,
        handlePrevious,
    };
};
