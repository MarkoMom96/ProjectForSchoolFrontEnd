export interface FinishedTestApiResponseDto {
	finishedTestId: number;
	test: {
		testId: number;
		testName: string;
	};
	isPassed: number;
	score: number;
	createdAt: string;
}
