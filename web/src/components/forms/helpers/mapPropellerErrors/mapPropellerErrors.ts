export const mapPropellerErrors = (error: PropellerAxiosError) => {
    const errors = error.response.errors
        .map((err) => {
            if (err.extensions.invalidArgs) {
                return err.extensions.invalidArgs.map((invalidArg) => {
                    return Object.values(invalidArg.constraints).map(
                        (constraint) => constraint
                    );
                });
            }
            return err.message;
        })
        .flat(3);

    return errors;
};

type InvalidArg = {
    target: {
        input: Record<string, string | number>;
    };
    value: Record<string, string | number>;
    property: string;
    children: {
        target: Record<string, string | number>;
        value: string;
        property: string;
        children: unknown[];
        constraints: Record<string, string | number>;
    }[];
    constraints: Record<string, string | number>;
};

type ValidationError = {
    message: string;
    path: string[];
    extensions: {
        invalidArgs?: InvalidArg[];
        code: string;
        serviceName: string;
        stacktrace: string[];
    };
};

export type PropellerAxiosError = {
    response: {
        errors: ValidationError[];
        data: null;
    };
};
