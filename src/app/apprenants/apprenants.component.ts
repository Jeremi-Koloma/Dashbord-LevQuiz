import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.scss']
})
export class ApprenantsComponent implements OnInit {

  // studentList !:  User[]
  studentList:any

  constructor(
    private router: Router,
    private accountService: AccountService,
 
  ){}

  ngOnInit() {

    this.TogetStudentList()
  }


  // Une fonction pour afficher la liste des Apprenants
  TogetStudentList(){
    this.accountService.getStudentList().subscribe(data=>{
      this.studentList = data;
      console.log(this.studentList)
    }
      // (data)=>{
      //   this.studentList = data;
      //   console.log(this.studentList)
      // },
      // (err)=>{
      //   console.log(err)
      // }
    )
  }


}
