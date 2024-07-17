// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = { [key: string]: any };

export const replaceEmptyStringWithNull = (obj: AnyObject): AnyObject => {
    const result: AnyObject = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            if (value === '') {
                result[key] = null;
            } else if (typeof value === 'object' && value !== null) {
                result[key] = replaceEmptyStringWithNull(value);
            } else {
                result[key] = value;
            }
        }
    }

    return result;
};
