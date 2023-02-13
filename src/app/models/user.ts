import { Notifications } from "./notifications";
import { Quiz } from "./quiz";
import { UserRoles } from "./role";

export class User {
    
    id !: number;
    firstname !: string;
    lastname !: string;
    username !: string;
    password !: string;
    email !: string;
    createdDate !: Date;
    notificationsList !: Notifications[];
    quizList !: Quiz[];
    userRoles!:UserRoles[]

}