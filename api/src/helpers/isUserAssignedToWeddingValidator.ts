import { UserInputError } from '@redwoodjs/graphql-server';

type IsUserAssignedToWeddingValidatorType = {
    requestWeddingId: string;
    message?: string;
};

export const isUserAssignedToWeddingValidator = ({
    requestWeddingId,
    message,
}: IsUserAssignedToWeddingValidatorType) => {
    if (requestWeddingId !== context.currentUser?.weddingId) {
        throw new UserInputError(message ?? 'Unauthorized');
    }
};
