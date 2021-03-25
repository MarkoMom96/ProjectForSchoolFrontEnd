export default class FinishedTestType {
	finishedTestId?: number;
	studentId?: number;
	test?: {
		testId?: number;
		testName?: string;
	};
	isPassed?: number;
	score?: number;
	createdAt?: string;
}
