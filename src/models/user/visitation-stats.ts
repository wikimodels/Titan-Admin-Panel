import { UserInfo } from './user-info.model';

export interface VisitationStats {
  user_info?: UserInfo;
  enter_date?: number;
  leave_date?: number;
  page_name?: string;
  stay_duration?: number;
}

export enum VisitationPageType {
  QUESTION = 'Вопрос №',
  MAIN = 'Главная',
  RESPONDENTS = 'Респонденты',
}
