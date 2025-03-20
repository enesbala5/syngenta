import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { company } from './data/generic';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Get the file name and file type from the given file name.
 * @param fileName - The file name.
 * @returns An object containing the `fileName` and `fileType`.
 */
export const getFileNameAndType = (fileName: string | undefined | null) => {
	if (!fileName) return { fileName: undefined, fileType: undefined };

	const fileTypeIndex = fileName.lastIndexOf('.');
	const fileType = fileName.substring(fileTypeIndex + 1);
	const fileNameWithoutExtension = fileName.substring(0, fileTypeIndex);

	return {
		fileName: fileNameWithoutExtension,
		fileType: fileType,
	};
};

/**
 * Returns the full name or a placeholder for a user.
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @returns The full name if both first name and last name are provided, otherwise a placeholder.
 */
export const returnNameOrPlaceholder = (name: string | undefined | null) => {
	if (name) return name;

	return `${company.name} User`;
};
