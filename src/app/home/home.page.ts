import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { Task } from './task';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  tasks: Array<Task> = [];
  email :any
  constructor(private authService:AuthServiceService,private router: Router) {
    this.tasks = [
      { title: 'Milk', status: 'open' },
      { title: 'Eggs', status: 'open' },
      { title: 'Syrup', status: 'open' },
      { title: 'Pancake Mix', status: 'open' }
    ];
  }
  ngOnInit(): void {
   
    this.authService.getProfile().then((user) =>{
        this.email = user?.email
        console.log(user);
        
    })
  }

 signOut(){

  this.authService.signOut().then(() =>{
    this.router.navigate(['/landing'])
  })
 }

 addItem() {
  let theNewTask: string | null = prompt("New Task");
  if (theNewTask !== '' && theNewTask !== null) {
    this.tasks.push({ title: theNewTask, status: 'open' });
  }
}

markAsDone(slidingItem: IonItemSliding, task: Task) {
  task.status = "done";

  setTimeout(() => { slidingItem.close(); }, 1);
}

removeTask(slidingItem: IonItemSliding, task: Task) {
  task.status = "removed";
  let index = this.tasks.indexOf(task);
  if (index != -1) {
    this.tasks.splice(index, 1);
  }

  setTimeout(() => { slidingItem.close(); }, 1);
}
}
