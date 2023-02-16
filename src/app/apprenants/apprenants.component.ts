import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.scss']
})
export class ApprenantsComponent implements OnInit {

  studentList:any
  paginateNumber: number = 1;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private confirmService: NgConfirmService,
 
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
    )
  }


   // une méthode pour supprimer un Formateur
   TodeleteUser(id: number) {
    this.confirmService.showConfirm("Voulez-vous vraiment supprimé ?",
      () => {
        this.accountService.deleteUser(id).subscribe(
          (data) => {
            console.log(data)
            this.TogetStudentList();
          }
        )
        window.location.reload()
      },

      () => {
        console.log("Non");
      }
    )
  }


}
