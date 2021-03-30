import QuestionType from "../types/QuestionType";

export interface TestApiResponseDto {
	testId: number;
	professorId: number;
	testName: string;
	duration: number;
	maxScore: number;
	isActive: boolean;
	questions?: QuestionType[];
}
