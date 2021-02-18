import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IPIFY_IP,
  GET_USER_INFO_BY_IP,
  SUPPLY_IP_ADDRESSES_WITH_LOCATIONS,
  UPLOAD_BATCH_OF_VISITATION_STATS,
} from 'consts/urls.consts';
import { catchError, map, tap, finalize, switchMap } from 'rxjs/operators';

import { UserInfo } from 'src/models/user/user-info.model';
import { getTestIps } from 'consts/test-ip-data';
import { Questionnaire, QuestionType } from 'src/models/questionnaire.model';
import { getPristionQuestionnaire } from 'consts/pristin-questionnaire';
import { from } from 'rxjs';
import * as moment from 'moment';
import { VisitationStats } from 'src/models/user/visitation-stats';

const pageNames = [
  'Вопрос №1',
  'Вопрос №2',
  'Вопрос №3',
  'Вопрос №4',
  'Вопрос №5',
  'Вопрос №6',
  'Вопрос №7',
  'Вопрос №8',
  'Вопрос №9',
  'Вопрос №10',
  'Вопрос №11',
  'Вопрос №12',
  'Вопрос №13',
  'Вопрос №14',
  'Вопрос №15',
  'Вопрос №16',
  'Вопрос №17',
  'Вопрос №18',
  'Вопрос №19',
  'Респонденты',
  'Главная',
];
//const pageNames = ['Главная'];
const startDate = new Date('2021-02-01');
const endDate = new Date('2021-02-14');

@Injectable({
  providedIn: 'root',
})
export class TestDataService {
  constructor(private readonly http: HttpClient) {}

  uploadVisitationStatsTestDate() {
    this.http
      .post<UserInfo[]>(SUPPLY_IP_ADDRESSES_WITH_LOCATIONS(), getTestIps())
      .pipe(
        map((usersInfo: UserInfo[]) => {
          usersInfo.forEach((user) => {
            const device = this.getRandomDeviceInfo();
            user.location = {
              type: 'Point',
              coordinates: [user.lon, user.lat],
            };
            user.os = device.os;
            user.os_version = device.os_version;
            user.browser = device.browser;
          });
          return usersInfo;
        }),
        map((usersInfo: UserInfo[]) => {
          const visitation_stats: VisitationStats[] = [];

          for (let i = 0; i < 6; i++) {
            usersInfo.forEach((userInfo) => {
              let visitationStats: VisitationStats = {};
              visitationStats.user_info = userInfo;
              visitationStats.page_name = this.supplyWithPageName();
              visitationStats = this.supplyWithDates(visitationStats);
              visitation_stats.push(visitationStats);
            });
          }

          return visitation_stats;
        }),
        switchMap((value) =>
          this.http.post<VisitationStats[]>(
            UPLOAD_BATCH_OF_VISITATION_STATS(),
            value
          )
        ),
        catchError((error) => {
          console.log(error);
          return from([]);
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  private supplyWithPageName() {
    const index = this.getRandomInt(0, pageNames.length - 1);
    return pageNames[index];
  }

  private supplyWithDates(visitationStats: VisitationStats) {
    visitationStats.enter_date = this.getRandomDate(endDate, startDate);
    visitationStats.stay_duration = this.getRandomDuraion();
    visitationStats.leave_date =
      visitationStats.enter_date + visitationStats.stay_duration;
    return visitationStats;
  }

  private getRandomDate(end, start) {
    return +new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
      .getTime()
      .toFixed(0);
  }
  private getRandomDuraion() {
    const randomNumber = this.getRandomInt(2, 10);
    return randomNumber * 1000;
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomText() {
    let text = '';
    let numberOfWords = this.getRandomInt(5, 10);
    for (let i = 0; i <= numberOfWords; i++) {
      let numberOfChars = this.getRandomInt(5, 10);
      let word = this.getRandomString(numberOfChars);
      text = text + word + ' ';
    }
    return text.trim();
  }

  private getRandomString(length) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  private getRandomDeviceInfo() {
    const devices = [
      { os: 'Windows', os_version: 'Windows_10', browser: 'Opera' },
      { os: 'iOS', os_version: 'iOS 11', browser: 'Safari' },
      { os: 'Linux', os_version: 'Debian', browser: 'Mozilla' },
    ];
    const index = this.getRandomInt(0, devices.length - 1);
    return devices[index];
  }

  private momentRandom(end = moment(), start) {
    const endTime = +moment(end);
    const randomNumber = (to, from = 0) =>
      Math.floor(Math.random() * (to - from) + from);

    if (start) {
      const startTime = +moment(start);
      if (startTime > endTime) {
        throw new Error('End date is before start date!');
      }
      return moment(randomNumber(endTime, startTime));
    }
    return moment(randomNumber(endTime));
  }
}
