import { RarityDict, VisibleCard } from "../../constants/Card";

export type SortType = "Name" | "Type" | "Rarity";

function findHighestRarity(card: VisibleCard) {
    let highestRarity = 0
    card.card_sets.forEach((set) => {
      const rarityVal = RarityDict[set.set_rarity]
      if(rarityVal > highestRarity) {
        highestRarity = rarityVal
      }
    })
    return highestRarity
}

export const sortCards = (sortType: SortType) => function(a: VisibleCard, b: VisibleCard){
    switch(sortType){
      case "Name":
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
  
        // names must be equal
        return 0;
      case "Type":
        const typeA = a.type.toUpperCase(); // ignore upper and lowercase
        const typeB = b.type.toUpperCase(); // ignore upper and lowercase
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
  
        // names must be equal
        return 0;
      case "Rarity":
        // this is actually wrong. should probably look up the set it's talking about to be accurate but skipping for now
        const aHighestRarity = findHighestRarity(a)
        const bHighestRarity = findHighestRarity(b)
        return bHighestRarity - aHighestRarity;
    }
  }