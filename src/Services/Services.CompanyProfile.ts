import CompanyDAO from "../DAO/CompanyDAO";
import { ICompanyProfileParams } from "../Interfaces/Interfaces.Company";

class CompanyProfileService {
  private companyDAO: CompanyDAO;
  constructor(companyDAO: CompanyDAO) {
    this.companyDAO = companyDAO;
  }
  createCompanyProfile(
    companyDetails: ICompanyProfileParams,
    userId: string,
    profileId: string
  ) {
    return new Promise((resolve, reject) => {
      this.companyDAO
        .CreateCompanyProfile(companyDetails, userId, profileId)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  getCompanyProfiles(userId: string) {
    return new Promise((resolve, reject) => {
      this.companyDAO
        .GetCompanyProfile(userId)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  updateCompanyProfile(
    userId: string,
    profileId: string,
    companyDetails: ICompanyProfileParams
  ) {
    return new Promise((resolve, reject) => {
      this.companyDAO
        .UpdateCompanyProfile(userId, profileId, companyDetails)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
  deleteCompanyProfile(profileId: string, userId: string) {
    return new Promise((resolve, reject) => {
      this.companyDAO
        .DeleteCompanyProfile(profileId, userId)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }
}

export default CompanyProfileService;
