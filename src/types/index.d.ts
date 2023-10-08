interface MetaData {
    sourceUrl: string;
    timestamp: Date;
}

interface NoteState extends MetaData {
    title: string;
    description: string;
}

type NoteActionType = {
    type: 'UPDATE_NOTE_TITLE' | 'UPDATE_NOTE_DESCRIPTION',
    payload: string
}