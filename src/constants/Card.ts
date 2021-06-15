export interface Card{
    "id": string,
    "name": string,
    "type": string,
    "set_name": string,
    "card_images": { image_url: string, image_url_small: string }[]
    "card_sets": [{"set_name": string, set_rarity: "Rare" | "Ultra Rare" | "Secret Rare" | "Common" | "Super Rare"}]
}