import AnswerType from "./AnswerTyper";

export default class QuestionType {
	id?: number;
	testId?: number;
	questionName?: string = "";
	questionAnswers?: AnswerType[];
	numberOfCorrectAnswers: number = 1;
}
