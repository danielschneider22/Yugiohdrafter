import { Card } from "./Card";

export interface Booster{
    cardSetCode: string
    cards?: Card[]
    id: string
}