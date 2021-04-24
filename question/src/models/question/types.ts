import { Question } from "..";

type ID = string;
export type Question = {
    id: ID,
    text: string,
    dateCreated: string,
    dateUpdated: string,
    helpful: number,
    notHelpful: number,
    userId?: string | undefined | null,
    userName?: string | undefined | null
};