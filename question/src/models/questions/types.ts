export type Question = {
  text: string,
  dateCreated: string,
  dateUpdated: string,
  helpful: number,
  notHelpful: number,
  userId?: string | undefined | null,
  userName?: string | undefined | null
};