import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';

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

  ) { }

  ngOnInit() {

    this.TogetFormateurList()
  }


  // Une fonction pour afficher la liste des Apprenants
  TogetFormateurList() {
    this.accountService.getFormateurList().subscribe(data => {
      this.formateurList = data;
    }
    )
  }


  // une méthode pour supprimer un Formateur
  TodeleteUser(id: number) {
    this.accountService.deleteUser(id).subscribe(
      {
        next: (data) => {


        },
        error: err => {
          console.log(err.status)

          if (err.status === 200) {
            this.popUp();
            // Appelons la fonction qui affiche la liste
            this.TogetFormateurList();
          }

        }
      }
    )
  }

  popUp() {
    Swal.fire({
      title: 'Alerte !',
      text: 'Voulez-vous vraiment supprimé ?',
      heightAuto: false,
      showConfirmButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      confirmButtonColor: '#1ED085',
      cancelButtonColor: '#EF3A2B',
      showDenyButton: false,
      showCancelButton: true,
      allowOutsideClick: false
    })
  }



}


