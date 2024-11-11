import { registerFragment } from '@redwoodjs/web/dist/apollo';

export const AssetBody = registerFragment(
    gql`
        fragment AssetBody on Asset {
            id
            fileType
            originalFilename
            previewUrl
            url
            thumbnailUrl
            title
            description
            altText
        }
    `
);
