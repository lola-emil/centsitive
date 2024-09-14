import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RecordService } from '../../repository/record/record.service';
import { AuthService } from '../../repository/auth/auth.service';

@Component({
  selector: 'app-add-record',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule],
  templateUrl: './add-record.component.html',
  styleUrl: './add-record.component.css'
})
export class AddRecordComponent {
  constructor(private formBuilder: FormBuilder, private recordService: RecordService,
    private authService: AuthService,
    private router: Router) { }

  recordForm = this.formBuilder.group({
    category: "",
    note: "",
    amount: ""
  });

  error = "";

  onSubmit() {
    const formData = new FormData();
    const userInfo = this.authService.getUserInfo();

    formData.append("category", this.recordForm.value.category!);
    formData.append("note", this.recordForm.value.note!);
    formData.append("amount", this.recordForm.value.amount!);
    formData.append("user_id", userInfo.user_id);

    this.recordService.addRecord({
      note: this.recordForm.value.note!,
      category: this.recordForm.value.category!,
      amount: parseFloat(this.recordForm.value.amount!),
      user_id: userInfo.user_id
    }, userInfo.token)
      .subscribe(response => {
        if (response instanceof HttpErrorResponse)
          this.error = response.error.message;
        else
          this.router.navigate(["/"])
      })
  }

}
