import { UserInputError } from '@redwoodjs/graphql-server';

type IsUserAssignedToWeddingValidatorType = {
    requestWeddingId: string;
};

export const isUserAssignedToWeddingValidator = ({
    requestWeddingId,
}: IsUserAssignedToWeddingValidatorType) => {
    if (requestWeddingId !== context.currentUser?.weddingId) {
        throw new UserInputError('Unauthorized');
    }
};
