import { Reponses } from "./reponses";

export class Questions {

    id !: number;
    question !: string;
    points !: number;
    duree !: number;
    responseList !: Reponses[];
}
