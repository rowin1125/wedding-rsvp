import type { CSSProperties } from 'react';

/**
 * @description This function is used to limit the number of lines of a long text
 * @note This CSS block is kind of an hack but is widely used online
 * @returns CSSProperties
 * @example
 * <Heading style={{ ...maxLines(2) }}>
 *      Super long heading text that should be limited to 2 lines
 * </Heading>
 */
const maxLines = (max: number): CSSProperties => {
    return {
        // Max 3 lines
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: max,
    };
};

export default maxLines;
