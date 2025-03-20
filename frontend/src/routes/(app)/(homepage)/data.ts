import type { WidgetInterface } from '$lib/components/custom/content/Widget/data';

export const mockWidgets: WidgetInterface[] = [
	{
		"type": "weather",
		"content": {
			"title": "Local Weather",
			"subtitle": "",
			"description": "the weather in your region",
			"location": "Unknown",
			"temperature": 3.7416738505747125,
			"condition": "Sunny",
			"humidity": 0.6,
			"wind_speed": 10.0
		}
	},
	{
		"type": "image",
		"content": {
			"title": "Image Widget",
			"src": "https://picsum.photos/200",
			"subtitle": "An image widget",
			"description": "This is an image widget"
		}
	},
	{
		"type": "video",
		"content": {
			"title": "Video Widget",
			"subtitle": "A video widget",
			"description": "This is a video widget",
			"videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
			"autoplay": true,
			"muted": true,
			"loop": true,
			"controls": true
		}
	},
	{
		"type": "location",
		"content": {
			"title": "Location Widget",
			"subtitle": "A location widget",
			"description": "This is a location widget",
			"location": [
				47.0,
				7.0
			]
		}
	},
	{
		"type": "explanation",
		"content": {
			"title": "Explanation Widget",
			"subtitle": "An explanation widget",
			"steps": [
				"Step 1",
				"Step 2",
				"Step 3"
			]
		}
	},
	{
		"type": "story",
		"content": {
			"title": "Story Widget",
			"subtitle": "A story widget",
			"slides": [
				{
					"title": "Slide 1",
					"content": "This is slide 1",
					"imageUrl": "https://picsum.photos/300/200"
				},
				{
					"title": "Slide 2",
					"content": "This is slide 2",
					"imageUrl": "https://picsum.photos/300/200"
				},
				{
					"title": "Slide 3",
					"content": "This is slide 3",
					"imageUrl": "https://picsum.photos/300/200"
				}
			]
		}
	}
];