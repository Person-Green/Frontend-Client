import type { ComponentType } from 'react';
import QuestionPlace from '../QuestionPlace.tsx';
import QuestionLight from '../QuestionLight.tsx';
import QuestionAir from '../QuestionAir.tsx';
import QuestionTempHumidity from '../QuestionTempHumidity.tsx';
import QuestionCare from '../QuestionCare.tsx';
import QuestionPet from '../QuestionPet.tsx';
import type { QuestionProps, SurveyAnswers } from '../types.ts';

export type QuestionConfig = {
  component: ComponentType<QuestionProps>;
  headerTitle: string;
  titleIcon: string;
  titleLines: string[];
  isReady: (answers: SurveyAnswers) => boolean;
};

export const QUESTIONS: QuestionConfig[] = [
  {
    component: QuestionPlace,
    headerTitle: '장소선택',
    titleIcon: 'place_item',
    titleLines: ['주로 어느 장소에 식물을', '배치하실 예정인가요?'],
    isReady: (a) => !!a.place,
  },
  {
    component: QuestionLight,
    headerTitle: '채광',
    titleIcon: 'sunny',
    titleLines: ['햇빛이 얼마나 들어오는', '공간인가요?'],
    isReady: (a) => !!a.light,
  },
  {
    component: QuestionAir,
    headerTitle: '환기 & 공기',
    titleIcon: 'air',
    titleLines: ['장소의 공기 순환이나', '환기 수준은 어떤 편인가요?'],
    isReady: (a) => !!a.air,
  },
  {
    component: QuestionTempHumidity,
    headerTitle: '온도 & 습도',
    titleIcon: 'dew_point',
    titleLines: ['장소의 온도와 습도는', '어떤 편인가요?'],
    isReady: (a) => !!a.temperature && !!a.humidity,
  },
  {
    component: QuestionCare,
    headerTitle: '관리',
    titleIcon: 'volunteer_activism',
    titleLines: ['식물을 어떻게', '돌봐줄 수 있나요?'],
    isReady: (a) => !!a.care,
  },
  {
    component: QuestionPet,
    headerTitle: '반려동물 & 경험',
    titleIcon: 'pets',
    titleLines: ['함께 살고있는', '반려동물이 있나요?'],
    isReady: (a) => !!a.pet && !!a.experience,
  },
];
