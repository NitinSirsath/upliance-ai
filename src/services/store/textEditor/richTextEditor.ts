import { create } from "zustand";
import { persist } from "zustand/middleware";

interface textObject {
  id: string;
  content: string;
}

interface TextEditor {
  textArray: textObject[];
  addTextArray: (textObject: textObject) => void;
}

const useRichTextEditor = create<TextEditor>()(
  persist(
    (set, get) => ({
      textArray: [],
      addTextArray: (newObject) => {
        const { textArray } = get();
        set({ textArray: [...textArray, newObject] });
      },
    }),
    { name: "rich-text-editor" }
  )
);

export default useRichTextEditor;
