import { createNote, useStore, removeAllNotes } from "../store";
import NoteDeskPage from "../components/noteDeskPage";
import NoteDeskContainer from "./noteDeskContainer";
import ControlsContainer from "./controlsContainer";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * max) + min;

export default function NoteDeskPageContainer() {
  const [, dispatch] = useStore();

  const create100Notes = () => {
    const dims = { x: 100, y: 100 };
    for (let index = 0; index < 100; index++) {
      dispatch(createNote(dims, { x: random(100, 500), y: random(100, 500) }));
    }
  };

  return (
    <NoteDeskPage
      controls={<ControlsContainer />}
      content={<NoteDeskContainer />}
      onCreate100NotesClick={create100Notes}
      onRemoveAllNotesClick={() => dispatch(removeAllNotes())}
    />
  );
}
