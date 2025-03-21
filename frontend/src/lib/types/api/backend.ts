/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/update-fields/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Update Field */
        put: operations["update_field_update_fields__put"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fields/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get Fields */
        get: operations["get_fields_fields__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login */
        post: operations["login_token_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/protected": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Protected Route */
        get: operations["protected_route_protected_get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/user/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get User */
        get: operations["get_user_user__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/widgets/{widget_type}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Widget
         * @description Retrieve a widget of the specified type.
         */
        get: operations["get_widget_widgets__widget_type__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/widgets/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Widgets
         * @description Retrieve a list of widgets, including weather data for the user's location.
         */
        get: operations["get_widgets_widgets__get"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ai/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Prompt */
        post: operations["prompt_ai__post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/text2speech": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Process File */
        post: operations["process_file_text2speech_post"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** Change */
        Change: {
            /**
             * Unit
             * @description The unit of measurement for the change (e.g., kg, tons)
             */
            unit: string;
            /**
             * Amount
             * @description The amount of change
             */
            amount: number;
        };
        /** ChartContent */
        ChartContent: {
            /**
             * Title
             * @description The title of the chart widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the chart widget
             */
            subtitle: string;
            /**
             * Description
             * @description An optional description of the chart
             */
            description?: string | null;
            /**
             * Data
             * @description The json data from plotly.
             */
            data: unknown;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** ChartWidgetModel */
        ChartWidgetModel: {
            /**
             * Type
             * @default chart
             * @constant
             */
            type: "chart";
            content: components["schemas"]["ChartContent"];
        };
        /** ExplanationContent */
        ExplanationContent: {
            /**
             * Title
             * @description The title of the explanation widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the explanation widget
             */
            subtitle: string;
            /**
             * Steps
             * @description A list of steps or instructions
             */
            steps: string[];
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** ExplanationWidgetModel */
        ExplanationWidgetModel: {
            /**
             * Type
             * @default explanation
             * @constant
             */
            type: "explanation";
            content: components["schemas"]["ExplanationContent"];
        };
        /** FieldModel */
        FieldModel: {
            /** Label */
            label: string;
            /**
             * Created At
             * Format: date-time
             */
            created_at: string;
            size: components["schemas"]["SizeModel"];
            /** Crop Id */
            crop_id: string;
            /** Owner Id */
            owner_id: string;
        };
        /** GeneralRiskProfileContent */
        GeneralRiskProfileContent: {
            /**
             * Title
             * @description The title of the risk profile widget
             */
            title: string;
            /**
             * Description
             * @description The description of the risk profile widget
             */
            description: string;
            /**
             * Subtitle
             * @description The subtitle of the risk profile widget
             */
            subtitle: string;
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: (components["schemas"]["StressRiskProfileContent"] | components["schemas"]["YieldRiskProfileContent"] | components["schemas"]["NutrientRiskProfileContent"])[];
        };
        /** GeneralRiskProfileModel */
        GeneralRiskProfileModel: {
            /**
             * Type
             * @default general_risk
             * @constant
             */
            type: "general_risk";
            content: components["schemas"]["GeneralRiskProfileContent"];
        };
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** HarvestContent */
        HarvestContent: {
            /**
             * Title
             * @description The title of the harvest widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the harvest widget
             */
            subtitle: string;
            /**
             * Direction
             * @description The direction of change (increase, decrease, or neutral)
             * @enum {string}
             */
            direction: "increase" | "decrease" | "neutral";
            /** @description The change in harvest metrics */
            change: components["schemas"]["Change"];
            /** @description The progress of harvest metrics */
            progress: components["schemas"]["Progress"];
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** HarvestWidgetModel */
        HarvestWidgetModel: {
            /**
             * Type
             * @default harvest
             * @constant
             */
            type: "harvest";
            content: components["schemas"]["HarvestContent"];
        };
        /** ImageContent */
        ImageContent: {
            /**
             * Title
             * @description The title of the image widget
             */
            title: string;
            /**
             * Src
             * @description The source URL of the image
             */
            src: string;
            /**
             * Subtitle
             * @description The subtitle of the image widget
             */
            subtitle: string;
            /**
             * Description
             * @description An optional description of the image
             */
            description?: string | null;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** ImageWidgetModel */
        ImageWidgetModel: {
            /**
             * Type
             * @default image
             * @constant
             */
            type: "image";
            content: components["schemas"]["ImageContent"];
        };
        /** LocationContent */
        LocationContent: {
            /**
             * Title
             * @description The title of the location widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the location widget
             */
            subtitle: string;
            /**
             * Description
             * @description An optional description of the location
             */
            description?: string | null;
            /**
             * Location
             * @description The coordinates of the location (latitude, longitude)
             */
            location: [
                number,
                number
            ];
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** LocationWidgetModel */
        LocationWidgetModel: {
            /**
             * Type
             * @default location
             * @constant
             */
            type: "location";
            content: components["schemas"]["LocationContent"];
        };
        /** LoginRequest */
        LoginRequest: {
            /** Phone Number */
            phone_number: string;
            /** Otp */
            otp: string;
        };
        /** NutrientRiskProfileContent */
        NutrientRiskProfileContent: {
            /**
             * Title
             * @description The title of the nutrient profile widget
             */
            title: string;
            /**
             * Description
             * @description The description of the nutrient profile widget
             */
            description: string;
            /**
             * Subtitle
             * @description The subtitle of the nutrient profile widget
             */
            subtitle: string;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: components["schemas"]["ChartWidgetModel"][];
            /**
             * Icon
             * @description The icon for the nutrient profile widget
             */
            icon: string;
            /**
             * Value
             * @description The nutrient percentage for the nutrient profile widget
             */
            value: number;
            /**
             * Unit
             * @description The unit of measurement for the nutrient
             * @default %
             */
            unit: string;
        };
        /** NutrientRiskProfileModel */
        NutrientRiskProfileModel: {
            /**
             * Type
             * @default nutrient_risk
             * @constant
             */
            type: "nutrient_risk";
            content: components["schemas"]["NutrientRiskProfileContent"];
        };
        /** Price */
        Price: {
            /**
             * Currency
             * @description The currency of the price
             */
            currency: string;
            /**
             * Amount
             * @description The amount of the price
             */
            amount: number;
        };
        /** ProductWidgetContent */
        ProductWidgetContent: {
            /**
             * Title
             * @description The title of the product description widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the product description widget
             */
            subtitle: string;
            /**
             * Description
             * @description The description of the product
             */
            description: string;
            /** @description The price of the product */
            price: components["schemas"]["Price"];
            /**
             * Source
             * @description The image URL of the product
             */
            source: string;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** ProductWidgetModel */
        ProductWidgetModel: {
            /**
             * Type
             * @default product
             * @constant
             */
            type: "product";
            content: components["schemas"]["ProductWidgetContent"];
        };
        /** Progress */
        Progress: {
            /**
             * Unit
             * @description The unit of measurement for the progress (e.g., kg, tons)
             */
            unit: string;
            /**
             * Amount
             * @description The amount of progress
             */
            amount: number;
        };
        /** PromptRequest */
        PromptRequest: {
            /** Prompt */
            prompt: string;
        };
        /** SizeModel */
        SizeModel: {
            /** Area */
            area: number;
        };
        /** Slide */
        Slide: {
            /**
             * Title
             * @description The title of the slide
             */
            title: string;
            /**
             * Content
             * @description The content of the slide
             */
            content: string;
            /**
             * Imageurl
             * @description An optional image URL for the slide
             */
            imageUrl?: string | null;
        };
        /** StoryContent */
        StoryContent: {
            /**
             * Title
             * @description The title of the story widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the story widget
             */
            subtitle: string;
            /**
             * Slides
             * @description A list of slides in the story
             */
            slides: components["schemas"]["Slide"][];
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** StoryWidgetModel */
        StoryWidgetModel: {
            /**
             * Type
             * @default story
             * @constant
             */
            type: "story";
            content: components["schemas"]["StoryContent"];
        };
        /** StressRiskProfileContent */
        StressRiskProfileContent: {
            /**
             * Title
             * @description The title of the risk profile widget
             */
            title: string;
            /**
             * Description
             * @description The description of the risk profile widget
             */
            description: string;
            /**
             * Subtitle
             * @description The subtitle of the risk profile widget
             */
            subtitle: string;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: components["schemas"]["ChartWidgetModel"][];
            /**
             * Icon
             * @description The icon for the risk profile widget
             */
            icon: string;
            /**
             * Value
             * @description The risk percentage for the risk profile widget
             */
            value: number;
            /**
             * Unit
             * @description The unit of measurement for the risk profile
             * @default %
             */
            unit: string;
        };
        /** StressRiskProfileModel */
        StressRiskProfileModel: {
            /**
             * Type
             * @default stress_risk
             * @constant
             */
            type: "stress_risk";
            content: components["schemas"]["StressRiskProfileContent"];
        };
        /** TextToSpeechRequest */
        TextToSpeechRequest: {
            /** Text */
            text: string;
        };
        /** TextWidgetContent */
        TextWidgetContent: {
            /**
             * Title
             * @description The title of the text widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the text widget
             */
            subtitle: string;
            /**
             * Description
             * @description The description of the text widget
             */
            description: string;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** TextWidgetModel */
        TextWidgetModel: {
            /**
             * Type
             * @default text
             * @constant
             */
            type: "text";
            content: components["schemas"]["TextWidgetContent"];
        };
        /** Token */
        Token: {
            /** Access Token */
            access_token: string;
            /** Token Type */
            token_type: string;
        };
        /** UserModel */
        UserModel: {
            /** Phone Number */
            phone_number: string;
            /** Name */
            name?: string | null;
            /** Lat */
            lat?: number | null;
            /** Lon */
            lon?: number | null;
            /** Token */
            token?: string | null;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** VideoContent */
        VideoContent: {
            /**
             * Title
             * @description The title of the video widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the video widget
             */
            subtitle: string;
            /**
             * Description
             * @description An optional description of the video
             */
            description?: string | null;
            /**
             * Videourl
             * @description The URL of the video
             */
            videoUrl: string;
            /**
             * Autoplay
             * @description Whether the video should autoplay
             * @default false
             */
            autoplay: boolean;
            /**
             * Muted
             * @description Whether the video should be muted
             * @default false
             */
            muted: boolean;
            /**
             * Loop
             * @description Whether the video should loop
             * @default false
             */
            loop: boolean;
            /**
             * Controls
             * @description Whether the video controls should be displayed
             * @default true
             */
            controls: boolean;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: unknown[];
            /**
             * Suffix
             * @description A list of widgets to display before the image
             */
            suffix?: unknown[];
        };
        /** VideoWidgetModel */
        VideoWidgetModel: {
            /**
             * Type
             * @default video
             * @constant
             */
            type: "video";
            content: components["schemas"]["VideoContent"];
        };
        /** WeatherContent */
        WeatherContent: {
            /**
             * Title
             * @description The title of the weather widget
             */
            title: string;
            /**
             * Subtitle
             * @description The subtitle of the weather widget
             */
            subtitle: string;
            /**
             * Description
             * @description A description of the weather widget
             */
            description: string | null;
            /**
             * Location
             * @description The location for the weather data
             */
            location?: string | null;
            /**
             * Temperature
             * @description The temperature in degrees Celsius
             */
            temperature?: number | null;
            /**
             * Icon
             * @description The weather icon.
             */
            icon?: string | null;
            /**
             * Humidity
             * @description The humidity percentage
             */
            humidity?: number | null;
            /**
             * Wind Speed
             * @description The wind speed in km/h
             */
            wind_speed?: number | null;
        };
        /** WeatherWidgetModel */
        WeatherWidgetModel: {
            /**
             * Type
             * @default weather
             * @constant
             */
            type: "weather";
            content: components["schemas"]["WeatherContent"];
        };
        /** YieldRiskProfileContent */
        YieldRiskProfileContent: {
            /**
             * Title
             * @description The title of the yield profile widget
             */
            title: string;
            /**
             * Description
             * @description The description of the yield profile widget
             */
            description: string;
            /**
             * Subtitle
             * @description The subtitle of the yield profile widget
             */
            subtitle: string;
            /**
             * Prefix
             * @description A list of widgets to display before the image
             */
            prefix?: components["schemas"]["ChartWidgetModel"][];
            /**
             * Icon
             * @description The icon for the yield profile widget
             */
            icon: string;
            /**
             * Value
             * @description The yield percentage for the yield profile widget
             */
            value: number;
            /**
             * Unit
             * @description The unit of measurement for the yield
             * @default %
             */
            unit: string;
        };
        /** YieldRiskProfileModel */
        YieldRiskProfileModel: {
            /**
             * Type
             * @default yield_risk
             * @constant
             */
            type: "yield_risk";
            content: components["schemas"]["YieldRiskProfileContent"];
        };
    };``
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    update_field_update_fields__put: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["FieldModel"][];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_fields_fields__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FieldModel"][];
                };
            };
        };
    };
    login_token_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Token"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    protected_route_protected_get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
        };
    };
    get_user_user__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["UserModel"];
                };
            };
        };
    };
    get_widget_widgets__widget_type__get: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                widget_type: "weather" | "image" | "video" | "location" | "explanation" | "story" | "harvest" | "chart" | "stress_risk" | "yield_risk" | "nutrient_risk" | "general_risk" | "product" | "text";
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WeatherWidgetModel"] | components["schemas"]["ImageWidgetModel"] | components["schemas"]["VideoWidgetModel"] | components["schemas"]["LocationWidgetModel"] | components["schemas"]["ExplanationWidgetModel"] | components["schemas"]["StoryWidgetModel"] | components["schemas"]["HarvestWidgetModel"] | components["schemas"]["ChartWidgetModel"] | components["schemas"]["StressRiskProfileModel"] | components["schemas"]["YieldRiskProfileModel"] | components["schemas"]["NutrientRiskProfileModel"] | components["schemas"]["GeneralRiskProfileModel"] | components["schemas"]["ProductWidgetModel"] | components["schemas"]["TextWidgetModel"];
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    get_widgets_widgets__get: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": (components["schemas"]["WeatherWidgetModel"] | components["schemas"]["ImageWidgetModel"] | components["schemas"]["VideoWidgetModel"] | components["schemas"]["LocationWidgetModel"] | components["schemas"]["ExplanationWidgetModel"] | components["schemas"]["StoryWidgetModel"] | components["schemas"]["HarvestWidgetModel"] | components["schemas"]["ChartWidgetModel"] | components["schemas"]["StressRiskProfileModel"] | components["schemas"]["YieldRiskProfileModel"] | components["schemas"]["NutrientRiskProfileModel"] | components["schemas"]["GeneralRiskProfileModel"] | components["schemas"]["ProductWidgetModel"] | components["schemas"]["TextWidgetModel"])[];
                };
            };
        };
    };
    prompt_ai__post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PromptRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    process_file_text2speech_post: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["TextToSpeechRequest"];
            };
        };
        responses: {
            /** @description Successful Response */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
