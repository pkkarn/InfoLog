import axios from 'axios'



//Create a config object for axios, you can also use axios.post("url", data) instead

//Send the request


export const DiscordService = {
    postMessage: async (noteData: NoteState, webhook: string) => {
        try {
            let embeds = [
                {
                    title: noteData.title,
                    color: 5174599,
                    footer: {
                        text: `📅 ${noteData.timestamp}`,
                    },
                    fields: [
                        {
                            name: "Title",
                            value: noteData.title
                        },
                        {
                            name: "Description",
                            value: noteData.description
                        },
                        {
                            name: "Source URL",
                            value: noteData.sourceUrl
                        },
                    ],
                },
            ];

            let payloadData = JSON.stringify({ embeds });

            let config = {
                method: "POST",
                url: webhook,
                headers: { "Content-Type": "application/json" },
                data: payloadData,
            };

            const { data } = await axios(config);
            return data;
        } catch(error) {
            console.error(error.message);
        }
    }
}
