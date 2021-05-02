export type Question = {
  text: string,
  dateCreated: string,
  dateUpdated: string,
  helpful: number,
  notHelpful: number,
  _id : string,
  userId?: string | undefined | null,
  userName?: string | undefined | null
};