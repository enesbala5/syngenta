import PDFPreview from './components/PDFPreview.svelte';
import ImagePreview from './components/ImagePreview.svelte';
import type { Preview } from './types';
import WordPreview from './components/WordPreview/WordPreview.svelte';

const documentType = ['pdf', 'md', 'txt', 'png', 'jpg', 'jpeg', 'doc', 'docx'] as const;
export type DocumentType = (typeof documentType)[number];
type ComponentPropMapping = Pick<Preview, 'component' | 'props' | 'previewCard'>;

const componentPropMappings = (preview: Props['preview']) => {
	return {

		word: {
			component: WordPreview,
			props: {},
			previewCard: {
				props: {
					className: 'border-blue-600/80 dark:border-blue-400/40',
					innerContainer: 'dark:bg-blue-900/30 bg-blue-100/50 dark:border-blue-700/30 border-blue-600/20',
					class: '!shadow-blue-600/10 dark:border-blue-700/50 dark:!shadow-blue-900/20',
					badge: '!bg-blue-600 dark:!bg-blue-500 border-blue-500 dark:border-blue-600'
				}
			}
		} satisfies ComponentPropMapping,
		image: {
			component: ImagePreview,
			props: {},
			previewCard: {
				props: {
					className: 'border-rose-600/50 dark:border-rose-400/40',

					innerContainer: 'dark:bg-rose-900/20 bg-rose-100/50 dark:border-rose-700/30 border-rose-600/20',
					class: '!shadow-rose-600/10 dark:border-rose-700/50 dark:!shadow-rose-900/20',
					badge: '!bg-rose-600 dark:!bg-rose-500 border-rose-500 dark:border-rose-600'

				}
			}
		} satisfies ComponentPropMapping,
		pdf: {
			component: PDFPreview,
			props: {},
			previewCard: {
				props: {
					className: 'border-red-600/50 dark:border-red-400/40',

					innerContainer: 'dark:bg-red-900/20 bg-red-100/50 dark:border-red-700/30 border-red-600/20',
					class: '!shadow-red-600/10 dark:border-red-700/50 dark:!shadow-red-900/20',
					badge: '!bg-red-600 dark:!bg-red-500 border-red-500 dark:border-red-600'

				}
			}
		} satisfies ComponentPropMapping,
		other: {
			component: PDFPreview,
			props: {},
			previewCard: {
				props: {
					className: 'border-yellow-600/50 dark:border-yellow-400/40',

					innerContainer: 'dark:bg-yellow-900/20 bg-yellow-100/50 dark:border-yellow-700/30 border-yellow-600/20',
					class: '!shadow-yellow-600/10 dark:border-yellow-700/50 dark:!shadow-yellow-900/20',
					badge: '!bg-yellow-600 dark:!bg-yellow-500 border-yellow-500 dark:border-yellow-600'

				}
			}
		} satisfies ComponentPropMapping
	} as const
}

interface Props {
	preview: Pick<Preview, 'name' | 'file' | 'type' | 'props'>
}

export const documentTypeMapping = (props: Props): Record<DocumentType, ComponentPropMapping> => {
	const { preview } = props;

	return {
		// Word
		doc: componentPropMappings({ ...preview }).word,
		docx: componentPropMappings({ ...preview }).word,
		// Image
		jpeg: componentPropMappings({ ...preview }).image,
		png: componentPropMappings({ ...preview }).image,
		jpg: componentPropMappings({ ...preview }).image,
		// PDF
		pdf: componentPropMappings({ ...preview }).pdf,
		// Other
		md: componentPropMappings({ ...preview }).other,
		txt: componentPropMappings({ ...preview }).other
	}
};


// ---

export const baseItems: number = 2;
export const maxItems: number = 5;