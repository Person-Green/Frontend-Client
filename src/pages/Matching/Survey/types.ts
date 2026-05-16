export type SurveyAnswers = {
  place?: string;
  light?: string;
  air?: string;
  temperature?: string;
  humidity?: string;
  care?: string;
  pet?: string;
  experience?: string;
};

export type QuestionProps = {
  step: number;
  total: number;
  answers: SurveyAnswers;
  setAnswers: (answers: SurveyAnswers) => void;
  onNext: () => void;
  onPrev: () => void;
};
