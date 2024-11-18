import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AddEmployeeComponent {
  employeeForm: FormGroup;
  httpservice = inject(HttpService);
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.employeeForm = this.fb.group({
      id: [this.data.id || 0, Validators.required], // Default to empty if no data
      name: [this.data.name || '', Validators.required],
      email: [this.data.email || '', [Validators.required, Validators.email]],
      salary: [this.data.salary || '', Validators.required],
      phone: [this.data.phone || '', Validators.required],
      age: [this.data.age || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.data === 'add') {
        this.httpservice.addEmployee(this.employeeForm.value).subscribe(
          (newEmployee: IEmployee) => {
            this.onClose();
            this.employeeForm.reset();
          },
          (error: any) => {
            console.error('Error adding employee', error);
          }
        );
      } else {
        this.httpservice.updateEmployee(this.data.id, this.employeeForm.value).subscribe(
          (newEmployee: IEmployee) => {
            this.onClose();
            this.employeeForm.reset();
          },
          (error: any) => {
            console.error('Error adding employee', error);
          }
        )
      }
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
