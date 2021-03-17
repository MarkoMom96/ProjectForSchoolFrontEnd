import QuestionType from "./QuestionType";

export default class TestType {
	testId?: number;
	testName?: string;
	numOfQuestions?: number;
	duration?: number;
	isActive?: boolean;
	questions?: QuestionType[];
}
