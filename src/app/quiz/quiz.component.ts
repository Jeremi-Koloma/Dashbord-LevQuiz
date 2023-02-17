import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quizList !: Quiz[]
  quizHost!: any;
  
  constructor(
    private quizService: QuizService,
  ){}


  ngOnInit() {

    this.quizHost = this.quizService.quizHost;
    
    this.TogetQuizList()

  }




    // Une fonction pour afficher la liste des Quiz
    TogetQuizList() {
      this.quizService.getQuiz().subscribe(
        (data) => {
          this.quizList = data;
        }
      )
    }

}
