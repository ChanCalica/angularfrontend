import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../shared/users.model';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public service: UsersService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:Users){

    this.service.formData = Object.assign({},selectedRecord);


  }

  onDelete(id:number){
    if(confirm('are you sure to delete this record?'))
    {

    this.service.deleteUsers(id)
    .subscribe(
      res =>{
        this.service.refreshList();
        this.toastr.error("Deleted Successfully", 'Users Register');
      
      },
      err =>{console.log(err)}
    )
    }


  }

}
