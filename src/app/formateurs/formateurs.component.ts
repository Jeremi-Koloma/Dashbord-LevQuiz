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
    }
    )
  }



  // une méthode pour supprimer un Formateur
  TodeleteUser(id: number) {
    Swal.fire({
      title: 'Suppression ?',
      text: "Êtes-vous vraiment sûr de le supprimer ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0C85F8',
      cancelButtonColor: '#E24C4C',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Anuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService.deleteUser(id).subscribe(
          (data) => {
            const formateurDeleted = data;
          }
        )
        Swal.fire({
            title: 'Supprimer !',
            text: 'Formateur supprimé avec succès !',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: "D'accord",
            confirmButtonColor: '#0C85F8',
          })
         // Actualise la page
         setTimeout(() => {
          window.location.reload();
        }, 3000)
      }

    })

  }







}


