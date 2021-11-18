export type Question = {
  id: string
  text: string
}

export type CreateOrUpdateQuestionDto = {
  text: string
  id?: string
}
