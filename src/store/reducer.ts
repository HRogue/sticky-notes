import {
  ChangeNoteAction,
  AddNoteAction,
  RemoveNoteAction,
  ActionTypes,
  RemoveAllNotesAction,
} from "./actions";
import { Dimensions } from "../types";

export type UnregisteredNoteState = Omit<NoteState, "id">;

export interface NoteState {
  readonly id: number;
  size: Dimensions;
  position: Dimensions;
  layer: number;
  text: string;
}

export interface State {
  notes: Record<number, NoteState>;
}

type actionsCollection = [
  ChangeNoteAction,
  AddNoteAction,
  RemoveNoteAction,
  RemoveAllNotesAction
];

export function reducer(state: State, action: actionsCollection[number]) {
  switch (action.type) {
    case ActionTypes.AddNote:
      return addNote(state, action.payload);
    case ActionTypes.ChangeNote:
      return setNote(state, action.payload);
    case ActionTypes.RemoveNote:
      return removeNote(state, action.payload);
    case ActionTypes.RemoveAll:
      return { ...state, notes: {} };
    default:
      throw new TypeError("unknown action");
  }
}

const addNote = (state: State, note: UnregisteredNoteState) => {
  const noteValues = Object.values(state.notes);
  let id = 0;
  if (noteValues.length > 0) {
    id = Math.max(...noteValues.map((note) => note.id)) + 1;
  }
  const notes = { ...state.notes, [id]: { ...note, id } };
  return { ...state, notes };
};

const setNote = (state: State, note: NoteState) => {
  const notes = { ...state.notes, [note.id]: { ...note } };
  return { ...state, notes };
};

const removeNote = (state: State, id: number) => {
  const notes = { ...state.notes };
  delete notes[id];
  return { ...state, notes };
};
