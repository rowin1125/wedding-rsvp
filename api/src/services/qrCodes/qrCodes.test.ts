import type { QrCode } from '@prisma/client';

import {
    qrCodes,
    qrCode,
    createQrCode,
    updateQrCode,
    deleteQrCode,
} from './qrCodes';
import type { StandardScenario } from './qrCodes.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('qrCodes', () => {
    scenario('returns all qrCodes', async (scenario: StandardScenario) => {
        const result = await qrCodes();

        expect(result.length).toEqual(Object.keys(scenario.qrCode).length);
    });

    scenario('returns a single qrCode', async (scenario: StandardScenario) => {
        const result = await qrCode({ id: scenario.qrCode.one.id });

        expect(result).toEqual(scenario.qrCode.one);
    });

    scenario('creates a qrCode', async () => {
        const result = await createQrCode({
            input: {
                id: 'String',
                redirectUrl: 'String',
                expiresAt: '2024-04-30T07:11:56.936Z',
                baseUrl: 'String',
                isActive: true,
                metadata: {},
            },
        });

        expect(result.code).toEqual('String');
        expect(result.redirectUrl).toEqual('String');
        expect(result.expiresAt).toEqual(new Date('2024-04-30T07:11:56.936Z'));
        expect(result.updatedAt).toEqual(new Date('2024-04-30T07:11:56.936Z'));
    });

    scenario('updates a qrCode', async (scenario: StandardScenario) => {
        const original = (await qrCode({
            id: scenario.qrCode.one.id,
        })) as QrCode;
        const result = await updateQrCode({
            id: original.id,
            input: { expiresAt: 'String2' },
        });

        expect(result.code).toEqual('String2');
    });

    scenario('deletes a qrCode', async (scenario: StandardScenario) => {
        const original = (await deleteQrCode({
            id: scenario.qrCode.one.id,
        })) as QrCode;
        const result = await qrCode({ id: original.id });

        expect(result).toEqual(null);
    });
});
