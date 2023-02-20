import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.scss']
})
export class ApprenantsComponent implements OnInit {

  studentList: any
  paginateNumber: number = 1;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private confirmService: NgConfirmService,

  ) { }

  ngOnInit() {

    this.TogetStudentList()
  }


  // Une fonction pour afficher la liste des Apprenants
  TogetStudentList() {
    this.accountService.getStudentList().subscribe(data => {
      this.studentList = data;
    }
    )
  }


  // une méthode pour supprimer un Formateur
  TodeleteUser(id: number) {
    Swal.fire({
      title: 'Suppression ?',
      text: "Êtes-vous vraiment sûr de supprimer l'apprénant ?",
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
            text: 'Apprénant supprimé avec succès !',
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
