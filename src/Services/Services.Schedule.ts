import ScheduleDAO from "../DAO/ScheduleDAO";
import { IScheduleParams } from "../Interfaces/Interfaces.Schedule";

class ScheduleService {
  private scheduleDAO: ScheduleDAO;
  constructor(scheduleDAO: ScheduleDAO) {
    this.scheduleDAO = scheduleDAO;
  }
  createSchedule(
    scheduleDetails: IScheduleParams,
    userId: string,
    profileId: string
  ) {
    return new Promise((resolve, reject) => {
      this.scheduleDAO
        .CreateSchedule(userId, profileId, scheduleDetails)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  getSchedule(userId: string, profileId: string) {
    return new Promise((resolve, reject) => {
      this.scheduleDAO
        .GetSchedule(userId, profileId)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  updateSchedule(
    userId: string,
    profileId: string,
    scheduleDetails: IScheduleParams
  ) {
    return new Promise((resolve, reject) => {
      this.scheduleDAO
        .UpdateSchedule(userId, profileId, scheduleDetails)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  deleteSchedule(userId: string, profileId: string) {
    return new Promise((resolve, reject) => {
      this.scheduleDAO
        .DeleteSchedule(userId, profileId)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
}

export default ScheduleService;
