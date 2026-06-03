interface StateMessage {
    message: string;
}

interface StateMessages {
    error: StateMessage;
    empty: StateMessage;
}

export const stateMessages: StateMessages = {
    error: {
        message: "No search result found!",
    },
    empty: {
        message: "Search for a place to get started",
    },
};
