import { ChangeEvent, useMemo, useRef } from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { BaseProps } from '../../FormControl/FormControl';
import { getFormattedTotalFilesSize } from '../helpers/getFormattedTotalFilesSize';

type useFileInputControlType = BaseProps & {
    defaultValue?: File[];
};

export const useFileInputControl = ({
    name,
    control,
    defaultValue,
}: useFileInputControlType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { field, fieldState } = useController<any>({
        name,
        control,
        defaultValue: defaultValue || [],
    });
    const { setValue, trigger } = useFormContext();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const totalFileSize = useMemo<string>(() => {
        const files = Array.from<File>(field.value);

        return getFormattedTotalFilesSize(files);
    }, [field.value]);

    const handleInputButtonClick = () => {
        inputRef.current?.click();
    };

    const filterSelection = (
        currentSelection: File[],
        newSelection: File[]
    ) => {
        return newSelection.filter(
            (newFile) =>
                !currentSelection.find(
                    (currentFile) => newFile.name === currentFile.name
                )
        );
    };

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const currentSelection = field.value;
        const newSelection = [...e.target.files];

        const filteredSelection = filterSelection(
            currentSelection,
            newSelection
        );

        setValue(name, [...currentSelection, ...filteredSelection]);
        trigger(name);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeFile = (fileName: string) => {
        const selection = field.value.filter((f: File) => f.name !== fileName);

        trigger(name);
        setValue(name, selection);
    };

    return {
        fieldState,
        field,
        inputRef,
        totalFileSize,
        handleInputButtonClick,
        handleFilesChange,
        removeFile,
    };
};
