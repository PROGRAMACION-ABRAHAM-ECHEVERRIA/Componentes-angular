import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { fam, res } from '../../types/users';

@Injectable({
  providedIn: 'root'
})
export class TablaServiceService {
  constructor(private http: HttpClient) { } 

  getAllUsers():Promise<fam[] | undefined>{ 
    return new Promise((resolve, reject)=>{ 
      this.http.get<res>('http://localhost:4000/catalogo-familias').subscribe({ 
        next: (data)=>{   
          resolve(data['data'])
        },
        error:(err)=>{  
          resolve(undefined) 
          window.alert('Error al obtener los usuarios')
        },
      })
    })
  } 



  
//   async catchError(service:Promise<object[]>){ 
//   try{
//     return await service  
//   }catch(err){ 
//     window.alert('Lo sentimos pero ha ocurrido un error')
//   }
// }





} 
