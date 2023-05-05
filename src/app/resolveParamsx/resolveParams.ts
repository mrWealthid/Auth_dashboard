// import {Injectable} from "@angular/core";
// import {HttpClient, HttpParams} from "@angular/common/http";
//
// import * as moment from "moment";
//
// @Injectable({providedIn: "root"})
// export class FormUtils {
//   constructor(private http: HttpClient, protected jhiAlertService: JhiAlertService) {
//   }
//
//   public resolveParams(params?: any, searchData?: any): any {
//     params = params || {};
//     let resolvedData = params;
//     if (searchData) {
//       searchData = JSON.parse(
//         JSON.stringify(searchData, (key, value) => {
//           if (value !== null) {
//             if (
//               key.indexOf("Date") > 0 ||
//               key === "createdDate.greaterThan" ||
//               key === "createdDate.lessThan" ||
//               key === "createdDate.equals"
//             ) {
//               value = moment(value, "YYYY-MM-DD").toDate().toISOString();
//             }
//             return value;
//           }
//         })
//       );
//       resolvedData = Object.assign(resolvedData, searchData);
//     }
//     return resolvedData;
//   }
// }
//
// export interface Pagination {
//   page: number;
//   size: number;
//   sort: string[];
// }
//
// export interface Search {
//   query: string;
// }
//
// export interface SearchWithPagination extends Search, Pagination {
// }
//
// export const createRequestOption = (req?: any): HttpParams => {
//   let options: HttpParams = new HttpParams();
//
//   if (req) {
//     for (const key in req) {
//       const params = req[key];
//       if (params !== 0 && !params) continue;
//
//       if (params instanceof Array) {
//         if (params.length > 0) options = options.set(key, params.join(","));
//         continue;
//       }
//
//       const sParams = `${params}`.trim();
//       if (sParams) {
//         options = options.set(key, sParams);
//       }
//     }
//   }
//
//   return options;
// };
