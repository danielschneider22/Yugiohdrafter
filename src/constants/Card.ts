export type Rarity = "Rare" | "Ultra Rare" | "Secret Rare" | "Common" | "Super Rare"

export const RarityDict = {
    "Common": 0,
    "Rare": 1,
    "Super Rare": 2,
    "Ultra Rare": 3,
    "Secret Rare": 4
}

export interface Card{
    "id": string,
    "name": string,
    "type": string,
    "set_name": string,
    "card_images": { image_url: string, image_url_small: string }[]
    "card_sets": [{"set_name": string, set_rarity: Rarity}],
    "level"?: number
    "atk"?: number
}

export interface VisibleCard extends Card{
    origIdx: number
}