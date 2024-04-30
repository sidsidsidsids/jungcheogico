import { create } from "zustand";

interface userStore {
  c_list: number[];
  java_list: number[];
  python_list: number[];
  quizIndex: number;
  quizLength: number;
  use_bookmark: boolean;
  quizIndex_up: () => void;
  quizIndex_down: () => void;
  quizIndex_zero: () => void;
  set_quizLength: (number: number) => void;
  use_bookmark_true: () => void;
  use_bookmark_false: () => void;
  c_list_init: (firstNumber?: number) => void;
  java_list_init: (firstNumber?: number) => void;
  python_list_init: (firstNumber?: number) => void;
}

const getRandomArray = (quizLength: number, firstNumber?: number) => {
  let randomArray = Array.from({ length: quizLength }, (_, i) => i + 1);

  if (firstNumber !== undefined) {
    const index = randomArray.indexOf(firstNumber);
    randomArray.splice(index, 1);
    randomArray.unshift(firstNumber);
  }

  for (let i = quizLength - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]];
  }

  return randomArray;
};

export const userStore = create<userStore>()((set, get) => ({
  c_list: [],
  java_list: [],
  python_list: [],
  quizIndex: 0,
  quizLength: 1,
  use_bookmark: false,

  quizIndex_up: () => {
    set((state) => ({
      quizIndex: state.quizIndex + 1,
    }));
  },
  quizIndex_down: () =>
    set((state) => ({
      quizIndex: state.quizIndex - 1,
    })),
  quizIndex_zero: () =>
    set(() => ({
      quizIndex: 0,
    })),
  use_bookmark_true: () =>
    set(() => ({
      use_bookmark: true,
    })),
  use_bookmark_false: () =>
    set(() => ({
      use_bookmark: false,
    })),
  set_quizLength(number) {
    set(() => ({
      quizLength: number,
    }));
  },
  c_list_init: (firstNumber?: number) => {
    const random_array = getRandomArray(5, firstNumber);
    set(() => ({
      c_list: random_array,
      quizLength: 5,
    }));
  },
  java_list_init: (firstNumber?: number) => {
    const random_array = getRandomArray(3, firstNumber);
    set(() => ({
      java_list: random_array,
      quizLength: 3,
    }));
  },
  python_list_init: (firstNumber?: number) => {
    const random_array = getRandomArray(2, firstNumber);
    set(() => ({
      python_list: random_array,
      quizLength: 2,
    }));
  },
}));
