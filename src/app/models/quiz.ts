import { Questions } from "./questions";

export class Quiz {
    
    id !: number;
    username !: string;
    titre !: string;
    description !: string;
    imagequizid !: number;
    imageName !: string;
    quizDate !: Date;
    questionsList !: Questions[];
}
