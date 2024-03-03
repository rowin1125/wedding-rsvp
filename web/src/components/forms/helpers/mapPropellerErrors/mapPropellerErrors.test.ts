import { mapPropellerErrors, PropellerAxiosError } from './mapPropellerErrors';

describe('mapPropellerErrors', () => {
    test('should map PropellerAxiosError correctly', () => {
        const error: PropellerAxiosError = {
            response: {
                errors: [
                    {
                        message: 'Invalid input',
                        path: ['fieldName'],
                        extensions: {
                            invalidArgs: [
                                {
                                    target: {
                                        input: {
                                            someField: 'value',
                                        },
                                    },
                                    value: {
                                        someField: 'invalidValue',
                                    },
                                    property: 'someField',
                                    children: [],
                                    constraints: {
                                        max: 'Value is too large',
                                    },
                                },
                                // Add more invalid arguments here if needed
                            ],
                            code: '400',
                            serviceName: 'service',
                            stacktrace: [],
                        },
                    },
                ],
                data: null,
            },
        };

        const expectedErrors = ['Value is too large'];
        const mappedErrors = mapPropellerErrors(error);

        expect(mappedErrors).toEqual(expectedErrors);
    });

    test('should map PropellerAxiosError correctly when multiple errors are present', () => {
        const error: PropellerAxiosError = {
            response: {
                errors: [
                    {
                        message: 'Invalid input',
                        path: ['fieldName'],
                        extensions: {
                            invalidArgs: [
                                {
                                    target: {
                                        input: {
                                            someField: 'value',
                                        },
                                    },
                                    value: {
                                        someField: 'invalidValue',
                                    },
                                    property: 'someField',
                                    children: [],
                                    constraints: {
                                        max: 'Value is too large',
                                        email: 'Invalid email',
                                    },
                                },
                                {
                                    target: {
                                        input: {
                                            someField: 'value',
                                        },
                                    },
                                    value: {
                                        someField: 'invalidValue',
                                    },
                                    property: 'someField',
                                    children: [],
                                    constraints: {
                                        min: 'Value is too small',
                                    },
                                },
                            ],
                            code: '400',
                            serviceName: 'service',
                            stacktrace: [],
                        },
                    },
                ],
                data: null,
            },
        };

        const expectedErrors = [
            'Value is too large',
            'Invalid email',
            'Value is too small',
        ];
        const mappedErrors = mapPropellerErrors(error);

        expect(mappedErrors).toEqual(expectedErrors);
    });

    test('should return an empty array when no errors are present', () => {
        const error: PropellerAxiosError = {
            response: {
                errors: [],
                data: null,
            },
        };

        const mappedErrors = mapPropellerErrors(error);

        expect(mappedErrors).toEqual([]);
    });

    test('should return an empty array when invalidArgs is empty', () => {
        const error: PropellerAxiosError = {
            response: {
                errors: [
                    {
                        message: 'Invalid input',
                        path: ['fieldName'],
                        extensions: {
                            invalidArgs: [],
                            code: '400',
                            serviceName: 'service',
                            stacktrace: [],
                        },
                    },
                ],
                data: null,
            },
        };

        const mappedErrors = mapPropellerErrors(error);

        expect(mappedErrors).toEqual([]);
    });
});
