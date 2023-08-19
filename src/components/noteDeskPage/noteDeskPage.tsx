import { ReactNode } from "react";
import styles from "./noteDeskPage.module.css";

export interface NoteDeskPageProps {
  controls: ReactNode;
  content: ReactNode;
  onCreate100NotesClick: () => void;
  onRemoveAllNotesClick: () => void;
}

export default function NoteDeskPage(props: NoteDeskPageProps) {
  return (
    <div className={styles["note-desk-page"]}>
      <div className={styles["note-desk-page__controls"]}>
        {props.controls}
        <div className={styles["note-desk-page__buttons-holder"]}>
          <button onClick={props.onCreate100NotesClick}>
            create 100 notes
          </button>
          <button onClick={props.onRemoveAllNotesClick}>
            remove all notes
          </button>
        </div>
      </div>
      <div className={styles["note-desk-page__dragzone"]}>{props.content}</div>
    </div>
  );
}
