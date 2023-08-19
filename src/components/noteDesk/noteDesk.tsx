import { useState } from "react";
import { Dimensions } from "../../types";
import style from "./noteDesk.module.css";
import DraggableContainer, { DraggableItem } from "../draggableContainer";
import TextNote from "../textNote";

interface NoteProps extends DraggableItem {
  text: string;
}

export interface NoteDeskProps {
  notes: NoteProps[];
  onNoteChanged: (note: NoteProps) => void;
  onNoteRemoved: (id: number) => void;
}

const isPointInsideRect = (
  { bottom, top, left, right }: DOMRect,
  { x, y }: Dimensions
) => x > left && x < right && y > top && y < bottom;

// TODO fix rerender all notes on every small change
export default function NoteDesk(props: NoteDeskProps) {
  const { notes, onNoteChanged, onNoteRemoved } = props;
  const [trashzone, setTrashzone] = useState<HTMLDivElement | null>(null);
  const [dragzone, setDragzone] = useState<HTMLDivElement | null>(null);

  return (
    <div ref={setDragzone} className={style["dragzone"]}>
      <div ref={setTrashzone} className={style["dragzone__trash"]}></div>
      {!dragzone
        ? null
        : notes.map((note) => (
            <DraggableContainer
              bounds={dragzone}
              onChange={(changes) => onNoteChanged({ ...note, ...changes })}
              key={note.id}
              {...note}
              onDragEnd={(cursorCoords) => {
                if (!trashzone) return;
                const rect = trashzone.getBoundingClientRect();
                isPointInsideRect(rect, cursorCoords) && onNoteRemoved(note.id);
              }}
            >
              <TextNote
                onChange={(text) => {
                  onNoteChanged({ ...note, text });
                }}
                text={note.text}
              />
            </DraggableContainer>
          ))}
    </div>
  );
}
