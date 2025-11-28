/**
 * Removes node from Dom after a delay
 *
 * Usage:
 * use:removeFromDomTimeout={3000}
 */

export function removeFromDomTimeout(node: HTMLElement, delay: number = 3000): any {
	setTimeout(() => node.remove(), delay);
}