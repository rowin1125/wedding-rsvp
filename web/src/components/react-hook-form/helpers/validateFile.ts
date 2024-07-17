import { mixed } from 'yup';

import { maxFileSizeInMB, maxFilesToUpload } from 'src/config/apiConfig';

import { ONE_MB } from '../components/FileInputControl/FileInputControl';

type ValidateFileProps = {
    isRequired?: boolean;
    maxFileSize?: number;
    hasMaxFiles?: boolean;
    maxFiles?: number;
    accept: string;
};

const validateFile = ({
    isRequired = false,
    maxFileSize = maxFileSizeInMB,
    maxFiles = maxFilesToUpload,
    accept,
}: ValidateFileProps) => {
    const fileValidation = mixed<File[]>()
        .test(
            'required',
            'Selecteer een bestand!',
            (files) => (files && files.length > 0) || !isRequired
        )
        .test('fileSize', 'Bestand(en) te groot', (files) => {
            const totalFileSize = Array.from(files ?? []).reduce(
                (acc, file) => acc + file.size,
                0
            );

            const acceptedFileSize = maxFileSize * ONE_MB;

            return totalFileSize <= acceptedFileSize;
        })
        .test(
            'AmountOfFiles',
            'Te veel bestanden geselecteerd',
            (files) => files && files.length <= maxFiles
        )
        .test('fileType', 'Ongeldig bestandstype', (files) => {
            let isValidFileType = true;

            for (const file of files as File[]) {
                const fileTypes = accept.split(',');

                if (
                    !fileTypes.some((type) =>
                        file.type.startsWith(type.replace('*', '').trim())
                    )
                ) {
                    isValidFileType = false;
                    break;
                }
            }

            return isValidFileType;
        });

    return fileValidation;
};

export default validateFile;
