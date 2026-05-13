import { CardSet } from "../../constants/CardSet";

export const sortCardSet = (a: CardSet, b: CardSet) => {
    if(a.custom_set && !b.custom_set) {
      return -1
    } else if (!a.custom_set && b.custom_set) {
      return 1
    }
    else {
      const nameA = (a.id ?? '').toUpperCase();
      const nameB = (b.id ?? '').toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
  }