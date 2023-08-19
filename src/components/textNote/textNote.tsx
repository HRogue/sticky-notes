import { useState } from "react";
import styles from "./textNote.module.css";

export interface TextNoteProps {
  onChange?: (text: string) => void;
  text: string;
}

export default function TextNote(props: TextNoteProps) {
  const [text, setText] = useState(props.text);
  return (
    <div className={styles["note"]}>
      <div
      className={styles['note__text']}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          setText(e.currentTarget.innerText);
        }}
        onBlur={() => {
          if (!props.onChange) {
            return;
          }

          props.onChange(text);
        }}
      >
        {props.text}
      </div>
    </div>
  );
}
