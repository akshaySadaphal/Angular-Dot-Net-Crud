import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = "https://localhost:44314";
  http = inject(HttpClient);
  constructor() { }

  getAllEmployee() {
    return this.http.get<IEmployee[]>(this.apiUrl + "/api/Employee");
  }

  addEmployee(employee: IEmployee) {
    return this.http.post<IEmployee>(`${this.apiUrl}/api/Employee`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<IEmployee>(`${this.apiUrl}/api/Employee/${id}`);
  }

  updateEmployee(id: number,employee: IEmployee) {
    return this.http.put<IEmployee>(`${this.apiUrl}/api/Employee/${id}`,employee);
  }
}
 