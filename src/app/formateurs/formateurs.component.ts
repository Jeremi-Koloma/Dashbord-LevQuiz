import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.scss']
})
export class FormateursComponent implements OnInit {


  formateurList: any
  paginateNumber: number = 1;
  userDeleted !: any

  constructor(
    private router: Router,
    private accountService: AccountService,
    private confirmService: NgConfirmService,

  ) { }

  ngOnInit() {

    this.TogetFormateurList()
  }


  // Une fonction pour afficher la liste des Apprenants
  TogetFormateurList() {
    this.accountService.getFormateurList().subscribe(data => {
      this.formateurList = data;
      console.log(this.formateurList)
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
            this.TogetFormateurList();
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


