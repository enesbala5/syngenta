import { coverLetterData } from '../../../../../routes/(app)/(homepage)/components/CoverLetterForm/state.svelte';
import { documentTypeMapping, type DocumentType } from '../ItemPreview/data';
import type { Preview } from '../ItemPreview/types';
import { getFileNameAndType } from '$lib/utils';
import { manageCVState } from './state.svelte';
import { toast } from 'svelte-sonner';
import { addStatusEntry, removeStatusEntry } from '../../../../../routes/(app)/(homepage)/components/CoverLetterForm/functions';

export const updatePreviews = (files: File[]) => {
	// Update Preview
	const parsed = files.map((file, i) => {
		const { fileName, fileType } = getFileNameAndType(file.name);

		console.log({ fileType })

		if (!fileName || !fileType) {
			console.log('Failed to get file name and type');
			toast.error(
				'Something went wrong while parsing your CV.', {
				description: 'Failed to get File Name and Type. Please rename it and upload again.',
				dismissable: true,
			}
			);
			removeFile(i);
			return;
		}

		console.log('file', file)

		const componentPropMapping = documentTypeMapping({
			preview: {
				file: file,
				name: fileName,
				type: fileType,
				props: {}
			}
		})?.[fileType as unknown as DocumentType];

		if (!componentPropMapping) {
			toast.error(
				'Document type was not recognized.', {
				description: 'Make sure to use one of the following: PDF / Word Document / Text / Markdown',
				dismissable: true,
			}
			);
			removeFile(i);
		} else {
			return {
				name: fileName,
				type: fileType,
				file: file,
				component: componentPropMapping.component,
				props: componentPropMapping.props,
				previewCard: componentPropMapping.previewCard
			} satisfies Preview;
		}
	});

	coverLetterData.previews = parsed.filter((v) => v !== undefined);
}

const addFile = (file: File) => {
	if (coverLetterData.files.length > 3) {
		toast.error("You can upload max. 4 items", {
			description: 'Please remove existing items, if you want to upload a new one.',
			dismissable: true
		})
	}
	coverLetterData.files.push(file);
	removeStatusEntry('pending-CV-update')
	updatePreviews(coverLetterData.files);
}

export const handleDrop = (
	e: DragEvent & {
		currentTarget: EventTarget & HTMLDivElement;
	},
) => {
	console.log('File(s) dropped');
	manageCVState.dragOver = false;

	// Prevent default behavior (Prevent file from being opened)
	e.preventDefault();

	if (!e.dataTransfer) {
		const message = "Something went wrong - couldn't process CV Upload";

		toast.error(message);
		console.error(message);

		return;
	}

	if (e.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		[...e.dataTransfer.items].forEach((item, i) => {
			// If dropped items aren't files, reject them
			if (item.kind === 'file') {
				const file = item.getAsFile();
				if (file) addFile(file);
			}
		});
	} else {
		// Use DataTransfer interface to access the file(s)
		[...e.dataTransfer.files].forEach((file, i) => {
			if (file) addFile(file);
		});
	}
};

export const handleDragOver = (
	e: DragEvent & {
		currentTarget: EventTarget & HTMLDivElement;
	}
) => {
	console.log('File(s) in drop zone');
	manageCVState.dragOver = true;

	// Prevent default behavior (Prevent file from being opened)
	e.preventDefault();
};

export const removeFile = (i: number) => {
	coverLetterData.files = coverLetterData.files.filter((v, index) => index !== i)

	if (coverLetterData.files.length < 1) addStatusEntry('pending-CV-update')
	updatePreviews(coverLetterData.files);
};

export const handleInputChange = (
	e: Event & {
		currentTarget: EventTarget & HTMLInputElement;
	}
) => {
	const uploaded = e.currentTarget.files;

	if (!uploaded || uploaded.length < 1) {
		toast.error('Something went wrong. Please try again.');
		return;
	}

	for (let file of uploaded) {
		console.log({ file });
		addFile(file);
	}

	toast.success(`Succesfully uploaded CV!`);
};