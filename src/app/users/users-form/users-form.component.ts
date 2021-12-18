import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/shared/users.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  constructor(public service: UsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);

  }

  insertRecord(form: NgForm) {
    this.service.postUsers().subscribe(
      res => {

        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Successful', 'User Registered')

      },

      err => {
        console.log(err);


      }


    );


  }

  updateRecord(form: NgForm) {
    this.service.putUsers().subscribe(
      res => {

        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info(' Updated Successfully', 'User Registered')

      },

      err => {
        console.log(err);


      }


    );


  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Users();


  }

}
