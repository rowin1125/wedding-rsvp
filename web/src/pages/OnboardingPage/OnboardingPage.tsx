import { Box, Container, Heading } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';

import { Metadata } from '@redwoodjs/web';

import Hero from 'src/components/Hero';
import SliderWrapper from 'src/components/SliderWrapper';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import OnboardingStepper from './components/OnboardingStepper';
import WeddingDayPartsForm from './components/WeddingDayPartsForm';
import WeddingInformationForm from './components/WeddingInformationForm';
import WeddingPartnerForm from './components/WeddingPartnerForm';
import { WeddingFormProvider } from './context/WeddingFormContext';
import { useOnboarding } from './hooks/useOnboarding';

const OnboardingPage = () => {
    const {
        initialGlobalFormState,
        handleNext,
        handlePrevious,
        handleStepClick,
        stepControls,
        steps,
    } = useOnboarding();

    return (
        <>
            <Metadata title="Onboarding" description="Onboarding page" />
            <Hero color="white" h="300px" />
            <Container>
                <AppContentWrapper>
                    <Heading>
                        Voltooi de stappen om je bruiloft te maken
                    </Heading>
                    <OnboardingStepper
                        activeStep={stepControls.activeStep}
                        handleStepClick={handleStepClick}
                        steps={steps}
                    />
                    <WeddingFormProvider
                        initialGlobalFormState={initialGlobalFormState}
                        stepControls={stepControls}
                        steps={steps}
                    >
                        <Box my={10}>
                            <SliderWrapper
                                w="full"
                                disableAutoPlay
                                h="full"
                                initialSlide={0}
                                loop={false}
                                slidesPerView={1}
                                slidesPerViewMobile={1}
                                controlledIndex={stepControls.activeStep}
                                cursor="default"
                                allowTouchMove={false}
                                showOverflow={false}
                                draggable={false}
                                noSwiping={true}
                                simulateTouch={false}
                                touchStartPreventDefault={true}
                                preventInteractionOnTransition={true}
                                disableKeyboard
                            >
                                <SwiperSlide>
                                    <WeddingInformationForm
                                        handleNext={handleNext}
                                        handlePrevious={handlePrevious}
                                        previousIsDisabled={
                                            stepControls.activeStep === 0
                                        }
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <WeddingPartnerForm
                                        handleNext={handleNext}
                                        handlePrevious={handlePrevious}
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <WeddingDayPartsForm
                                        handlePrevious={handlePrevious}
                                    />
                                </SwiperSlide>
                            </SliderWrapper>
                        </Box>
                    </WeddingFormProvider>
                </AppContentWrapper>
            </Container>
        </>
    );
};

export default OnboardingPage;
