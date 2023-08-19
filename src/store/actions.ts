import { Dimensions } from "../types";
import { NoteState, State, UnregisteredNoteState } from "./reducer";

export enum ActionTypes {
  AddNote,
  ChangeNote,
  RemoveNote,
  RemoveAll,
}

export interface RemoveAllNotesAction {
  type: ActionTypes.RemoveAll;
}

export function removeAllNotes(): RemoveAllNotesAction {
  return { type: ActionTypes.RemoveAll };
}

export interface AddNoteAction {
  type: ActionTypes.AddNote;
  payload: UnregisteredNoteState;
}

export function createNote(
  size: Dimensions,
  position: Dimensions
): AddNoteAction {
  return {
    type: ActionTypes.AddNote,
    payload: {
      size,
      position,
      layer: 0,
      text: "New note",
    },
  };
}

export function changeNote(payload: NoteState, prevState: State): ChangeNoteAction {
  const maxLayer = Math.max(
    ...Object.values(prevState.notes).map((note) => note.layer)
  );

  return {
    type: ActionTypes.ChangeNote,
    payload: { ...payload, layer: maxLayer + 1 },
  };
}

export interface ChangeNoteAction {
  type: ActionTypes.ChangeNote;
  payload: NoteState;
}

export interface RemoveNoteAction {
  type: ActionTypes.RemoveNote;
  payload: number;
}
