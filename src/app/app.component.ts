import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TablaComponent } from "../componentes/tabla/tabla.component";
import { TablaServiceService } from '../componentes/tabla/tabla-service.service';
import { users } from '../types/users';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TablaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'componentes-din';  
  public dataUsers: users[] =[];

  constructor ( 
    private tablaService: TablaServiceService
   ){}; 


  async ngOnInit(): Promise<void> {
    let res = await this.tablaService.getAllUsers();  
    this.dataUsers = res as users[]; 
    console.log(this.dataUsers); 
  }


}
