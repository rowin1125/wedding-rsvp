import { useRef, useState } from 'react';

import { FocalPoint } from '../FocalPoint';
import { onMove } from '../helpers/focalHelpers';

type UseFocalPointType = {
    focalPoint?: FocalPoint;
    onChange: (focalPoint: FocalPoint) => void;
};

const DEFAULT_PERCENTAGE = 50;

export const useFocalPoint = ({ onChange, focalPoint }: UseFocalPointType) => {
    const ref = useRef<HTMLDivElement>(null);
    const [x, setX] = useState<number>(focalPoint?.x ?? DEFAULT_PERCENTAGE);
    const [y, setY] = useState<number>(focalPoint?.y ?? DEFAULT_PERCENTAGE);
    const [canMove, setCanMove] = useState(false);

    return {
        ref,
        x,
        y,
        onMove: onMove({
            setX,
            setY,
            container: ref.current as HTMLDivElement,
            onChange: (x, y) => onChange({ x, y }),
            canMove,
        }),
        canMove,
        setCanMove,
    };
};
