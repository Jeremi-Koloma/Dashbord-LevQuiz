import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from '../models/quiz';
import { Reponses } from '../models/reponses';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { QuizService } from '../services/quiz.service';
import { ReponseService } from '../services/reponse.service';
import { AlertType } from '../_Enum/alert-type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  studentList !: User[]
  formateurList !: User[]
  formateurListStatusNoActive !: any
  formateurCompteActiver !: any
  quizList !: Quiz[]
  reponseList !: Reponses[]
  nombreNotification!: number;
  userphoto!: string;
  p: number = 1;
  paginateNumberStatus: number = 1;


  constructor(
    private router: Router,
    private accountService: AccountService,
    private quizService: QuizService,
    private reponseService: ReponseService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.TogetStudentList()

    this.TogetFormateurList()

    this.TogetFormateurListNoActive()

    this.TogetQuizList()

    this.TogetReponseList()
  }


  // Une fonction pour afficher la liste des Apprenants
  TogetStudentList() {
    this.accountService.getStudentList().subscribe(
      (data) => {
        this.studentList = data;
      }
    )
  }


  // Une fonction pour afficher la liste des Formateurs
  TogetFormateurList() {
    this.accountService.getFormateurList().subscribe(
      (data) => {
        this.formateurList = data;
      }
    )
  }


  // Une fonction pour afficher la liste des Formateurs
  TogetFormateurListNoActive() {
    this.accountService.getFormateurListNoActive().subscribe(
      (data) => {
        this.formateurListStatusNoActive = data;
      }
    )
  }


  // Une fonction pour Activer le formateur
  ToActiveStatus(id: number) {
    this.accountService.ActiveStatus(id).subscribe(
      (data) => {
        this.formateurCompteActiver = data;
        window.location.reload()
      }
    )
  }


  // Une fonction pour afficher la liste des Quiz
  TogetQuizList() {
    this.quizService.getQuiz().subscribe(
      (data) => {
        this.quizList = data;
      }
    )
  }


  // Une fonction pour afficher la liste des Reponses
  TogetReponseList() {
    this.reponseService.getReponseList().subscribe(
      (data) => {
        this.reponseList = data;
      }
    )
  }



  goToStudent() {
    this.router.navigate(['/apprenants'])
  }

  goToFormateurs() {
    this.router.navigate(['/formateurs'])
  }



}
