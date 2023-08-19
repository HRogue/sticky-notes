import { useMemo } from "react";
import NoteDesk from "../components/noteDesk";
import { ActionTypes, changeNote, useStore } from "../store";

export default function NoteDeskContainer() {
  const [state, dispatch] = useStore();
  const notes = useMemo(() => Object.values(state.notes), [state.notes]);

  return (
    <NoteDesk
      notes={notes}
      onNoteChanged={(payload) => {
        dispatch(changeNote(payload, state));
      }}
      onNoteRemoved={(payload) => {
        dispatch({ type: ActionTypes.RemoveNote, payload });
      }}
    />
  );
}
