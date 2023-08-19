import { useRef } from "react";
import styles from "./controls.module.css";
import { Dimensions } from "../../types";

export interface ControlsProps {
  onCreateNoteClick: (size: Dimensions, position: Dimensions) => void;
}

enum ControlsFormFields {
  x = "x",
  y = "y",
  width = "width",
  height = "height",
}

const handleFormValues = (
  form: HTMLFormElement
): { size: Dimensions; position: Dimensions } => {
  const formData = new FormData(form);

  const toNumber = (value: FormDataEntryValue | null) => {
    if (typeof value !== "string") {
      throw new TypeError();
    }

    return parseInt(value);
  };

  return {
    size: {
      x: toNumber(formData.get(ControlsFormFields.width)),
      y: toNumber(formData.get(ControlsFormFields.height)),
    },
    position: {
      x: toNumber(formData.get(ControlsFormFields.x)),
      y: toNumber(formData.get(ControlsFormFields.y)),
    },
  };
};

export default function Controls(props: ControlsProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className={styles["controls"]}>
      <form
        className={styles["controls__form"]}
        ref={formRef}
        onSubmit={(e) => {
          if (!formRef.current) {
            console.warn("Button clicked, but have no form reference");
            return;
          }

          const values = handleFormValues(formRef.current);
          props.onCreateNoteClick(values.size, values.position);
          e.preventDefault();
        }}
      >
        <div className={styles["controls__inputs-holder"]}>
          <label>x:</label>
          <input
            type="number"
            required
            name={ControlsFormFields.x}
            min="0"
            defaultValue="100"
          ></input>
          <label>y:</label>
          <input
            type="number"
            required
            name={ControlsFormFields.y}
            min="0"
            defaultValue="100"
          ></input>
          <label>width:</label>
          <input
            type="number"
            required
            name={ControlsFormFields.width}
            min="70"
            defaultValue="100"
          ></input>
          <label>height:</label>
          <input
            type="number"
            required
            name={ControlsFormFields.height}
            min="70"
            defaultValue="100"
          ></input>
        </div>
        <button>create note</button>
      </form>
    </div>
  );
}
