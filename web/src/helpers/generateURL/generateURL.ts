type QueryParams = Record<string, string | string[]>;

type URLInfo = {
    fullURL: string;
    queryParams: QueryParams;
    queryString: string;
};

export const generateURL = (
    pathname: string,
    queryOrQueryString: QueryParams | string = {}
): URLInfo => {
    let searchParams = new URLSearchParams();

    // If queryOrQueryString is a string, parse it to URLSearchParams
    if (typeof queryOrQueryString === 'string') {
        searchParams = new URLSearchParams(queryOrQueryString);
    } else {
        // Populate the URLSearchParams object with the query object
        Object.entries(queryOrQueryString).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val) => searchParams.append(key, val));
            } else {
                searchParams.append(key, value);
            }
        });
    }

    // Create the full new URL by combining the pathname and search parameters
    const fullURL =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // Create an object to store the query parameters
    const queryParams: QueryParams = {};

    // Iterate over each search parameter and store them in the queryParams object
    searchParams.forEach((value, key) => {
        if (queryParams[key]) {
            if (!Array.isArray(queryParams[key])) {
                queryParams[key] = [queryParams[key] as string];
            }
            (queryParams[key] as string[]).push(value);
        } else {
            queryParams[key] = value;
        }
    });

    // Create a string for appending all query strings to the pathname
    const queryString = searchParams.toString()
        ? `?${searchParams.toString()}`
        : '';

    // Return an object containing the full new URL, query parameters, and query string
    return {
        fullURL,
        queryParams,
        queryString,
    };
};
