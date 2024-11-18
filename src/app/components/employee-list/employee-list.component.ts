import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})

export class EmployeeListComponent {
  employeeList: IEmployee[] = [];
  httpservice = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary'];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.httpservice.getAllEmployee().subscribe((result) => {
      this.employeeList = result;
    })
  }

  upsert(empData: any, emp: any): void {
    const isAdding = !emp || emp === 'add';
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '700px',
      data: !isAdding ? {
        id: empData.id || '',
        name: empData.name || '',
        email: empData.email || '',
        salary: empData.salary || '',
        phone: empData.phone || '',
        age: empData.age || ''
      } : emp
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllEmployee();
    });
  }

  deleteEmployee(id: number) {
    this.httpservice.deleteEmployee(id).subscribe(res => {
      this.getAllEmployee();
    });
  }
}
