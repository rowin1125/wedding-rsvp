type OnMoveType = {
    setX: (x: number) => void;
    setY: (y: number) => void;
    container: HTMLDivElement;
    canMove: boolean;
    onChange: (x: number, y: number) => void;
};

const parseToPercentage = (value: number, max: number) =>
    Math.min(Math.max((value * 100) / max, 0), 100);

export const onMove =
    ({ canMove, container, setX, setY, onChange }: OnMoveType) =>
    (e: React.MouseEvent<HTMLDivElement | HTMLImageElement>) => {
        const isClick = e.type === 'click';

        if (canMove || isClick) {
            const event = e;
            const containerBoundingRectangle =
                container.getBoundingClientRect();
            const xPixels = event.clientX - containerBoundingRectangle.left;
            const yPixels = event.clientY - containerBoundingRectangle.top;
            const currentTarget = event.currentTarget as HTMLDivElement;
            const x = parseToPercentage(xPixels, currentTarget.clientWidth);
            const y = parseToPercentage(yPixels, currentTarget.clientHeight);

            setX(x);
            setY(y);
            onChange(x, y);
        }
    };
