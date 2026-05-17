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
  answers: SurveyAnswers;
  setAnswers: (answers: SurveyAnswers) => void;
};
