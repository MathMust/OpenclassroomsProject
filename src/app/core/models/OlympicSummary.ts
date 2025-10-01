import { Olympic } from "./Olympic";

export interface OlympicSummary extends Olympic {
    nbEntries: number;
    totalNbMedals: number;
    totalNbAthletes: number;
}