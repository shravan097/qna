export type Answer = {
  id: string
  questionId: string
  text: string
}

export type CreateOrUpdateAnswerDto = {
  id?: string
  text: string
  questionId: string
}
