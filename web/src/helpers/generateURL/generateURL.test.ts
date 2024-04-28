import { generateURL } from './generateURL';

describe('generateURL', () => {
    it('should generate URL with query parameters from object', () => {
        const pathname = '/test';
        const query = { param1: 'value1', param2: 'value2' };
        const expectedURL = '/test?param1=value1&param2=value2';

        const result = generateURL(pathname, query);

        expect(result.fullURL).toBe(expectedURL);
        expect(result.queryParams).toEqual(query);
        expect(result.queryString).toBe('?param1=value1&param2=value2');
    });

    it('should generate URL with query parameters from string', () => {
        const pathname = '/test';
        const queryString = '?param1=value1&param2=value2';
        const expectedURL = '/test?param1=value1&param2=value2';

        const result = generateURL(pathname, queryString);

        expect(result.fullURL).toBe(expectedURL);
        expect(result.queryParams).toEqual({
            param1: 'value1',
            param2: 'value2',
        });
        expect(result.queryString).toBe('?param1=value1&param2=value2');
    });

    it('should handle empty query parameters', () => {
        const pathname = '/test';
        const expectedURL = '/test';

        const result = generateURL(pathname);

        expect(result.fullURL).toBe(expectedURL);
        expect(result.queryParams).toEqual({});
        expect(result.queryString).toBe('');
    });

    it('should handle array values in query parameters', () => {
        const pathname = '/test';
        const query = { param1: ['value1', 'value2'], param2: 'value3' };
        const expectedURL = '/test?param1=value1&param1=value2&param2=value3';

        const result = generateURL(pathname, query);

        expect(result.fullURL).toBe(expectedURL);
        expect(result.queryParams).toEqual(query);
        expect(result.queryString).toBe(
            '?param1=value1&param1=value2&param2=value3'
        );
    });

    it('should handle complex query parameters', () => {
        const pathname = '/test';
        const query = {
            param1: 'value1',
            param2: ['value2', 'value3'],
            param3: 'value4',
        };
        const expectedURL =
            '/test?param1=value1&param2=value2&param2=value3&param3=value4';

        const result = generateURL(pathname, query);

        expect(result.fullURL).toBe(expectedURL);
        expect(result.queryParams).toEqual(query);
        expect(result.queryString).toBe(
            '?param1=value1&param2=value2&param2=value3&param3=value4'
        );
    });
});
