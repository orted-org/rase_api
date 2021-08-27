import UserDetail from "../Class/Class.UserDetails";
import UserDetailModel from "../Models/Model.UserDetail";

class UserDetailService {
  userDetailModel: UserDetailModel;
  constructor(userDetailModel: UserDetailModel) {
    this.userDetailModel = userDetailModel;
  }
  createUserDetail(userDetail: UserDetail, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.userDetailModel.createUserDetailInDB(
          userDetail,
          userId
        );
        return resolve(res);
      } catch (err) {
        return reject(err);
      }
    });
  }
  getUserDetail(userId: string) {
    return new Promise<UserDetail>((resolve, reject) => {
      this.userDetailModel
        .getUserDetailFromDB(userId)
        .then((userData) => {
          return resolve(userData);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  updateUserDetail(userDetail: UserDetail, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.userDetailModel.updateUserDetailInDB(
          userDetail,
          userId
        );
        return resolve(res);
      } catch (err) {
        return reject(err);
      }
    });
  }
}

export default UserDetailService;
