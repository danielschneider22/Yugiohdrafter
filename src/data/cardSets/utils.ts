import { CardSet } from "../../constants/CardSet";

export const sortCardSet = (a: CardSet, b: CardSet) => {
    if(a.custom_set && !b.custom_set) {
      return -1
    } else if (!a.custom_set && b.custom_set) {
      return 1
    }
    else {
      const nameA = a.set_name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.set_name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameB > nameB) {
        return 1;
      }
      return 0;
    }
  }