export interface Message {
	id: number;
	// avatar: string;
	name: string;
	role: 'user' | 'ai';
	message: string;
	isLoading?: boolean;
}
