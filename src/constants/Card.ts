export interface Card{
    "id": string,
    "name": string,
    "type": string,
    "set_name": string,
    "card_images": { image_url: string, image_url_small: string }[]
}