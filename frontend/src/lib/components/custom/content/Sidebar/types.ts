import type { Component } from 'svelte';

export interface SidebarInsertProps {
	isActive: boolean;
	sidebarOpen: boolean
}

export type SidebarInsert = Component<SidebarInsertProps>