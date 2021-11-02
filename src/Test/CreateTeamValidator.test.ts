// import { ValidateCreateTeam } from "../Controllers/Team/Controller.Team.CreateTeam";

import _path from "./../Helpers/Helper.rootPath";

// //error
// test("create team validator check", async () => {
//   try {
//     const input: any = {
//       teamName: undefined,
//       teamDescription: undefined,
//     };
//     const data = await ValidateCreateTeam(
//       input.teamName,
//       input.teamDescription
//     );
//     expect(data).toBe(null);
//   } catch (err) {
//     console.log(err);
//     expect(err).not.toBeNull();
//   }
// });

// //error
// test("create team validator check", async () => {
//   try {
//     const input: any = {
//       teamName: "hello",
//       teamDescription: undefined,
//     };
//     const data = await ValidateCreateTeam(
//       input.teamName,
//       input.teamDescription
//     );
//     expect(data).toBe(null);
//   } catch (err) {
//     console.log(err);
//     expect(err).not.toBeNull();
//   }
// });

// //error
// test("create team validator check", async () => {
//   try {
//     const input: any = {
//       teamName: null,
//       teamDescription: "some description",
//     };
//     const data = await ValidateCreateTeam(
//       input.teamName,
//       input.teamDescription
//     );
//     expect(data).toBe(null);
//   } catch (err) {
//     console.log(err);
//     expect(err).not.toBeNull();
//   }
// });

// // expected
// test("create team validator check", async () => {
//   try {
//     const input: any = {
//       teamName: "team name",
//       teamDescription: "some description",
//     };
//     const data = await ValidateCreateTeam(
//       input.teamName,
//       input.teamDescription
//     );
//     expect(data).toBe(true);
//   } catch (err) {
//     expect(err).toBeNull();
//   }
// });


test("root path", function(){
  console.log(_path);
  expect(_path).toBe(null);
})