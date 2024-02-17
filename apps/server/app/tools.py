tools = [
    {
        "type": "function",
        "function": {
            "name": "get_user_action",
            "description": "A user will pass in a transcription of an action they want to do on the frontend. This function will return the action that the user wants to do. Pass in the action wants to do.",
            "parameters": {
                "type": "object",
                "properties": {
                    "action": {
                        "type": "string",
                        "enum": [
                            "open-dog-services",
                            "open-home-page",
                            "logout",
                            "go-to-landing",
                            "unknown",
                        ],
                    },
                },
                "required": ["action"],
            },
        },
    },
]
