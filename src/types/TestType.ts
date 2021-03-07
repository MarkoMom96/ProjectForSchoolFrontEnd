import QuestionType from "./QuestionType";

export default class TestType {
  testId?: number 
  professorName?: string
  name?: string
  numOfQuestions?: number
  duration?: number
  questions?: QuestionType[]
}