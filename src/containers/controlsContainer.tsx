import Controls from "../components/controls";
import { createNote, useStore } from "../store";

export default function ControlsContainer() {
  const [, dispatch] = useStore();

  return (
    <Controls
      onCreateNoteClick={(size, pos) => dispatch(createNote(size, pos))}
    />
  );
}
