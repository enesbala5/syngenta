export interface ManageCVState {
	dragOver: boolean
}

export const manageCVState: ManageCVState = $state({
	dragOver: false,
})