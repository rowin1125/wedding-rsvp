import { useState } from 'react';

import { HeroData } from '../Hero';

type UseControlHeroType = {
    initialValues: HeroData;
};

export const useControlHero = ({ initialValues }: UseControlHeroType) => {
    const [heroData, setHeroData] = useState<HeroData>(initialValues);

    return {
        heroData,
        setHeroData,
    };
};
