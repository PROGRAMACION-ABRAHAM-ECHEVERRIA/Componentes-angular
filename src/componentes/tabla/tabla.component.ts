import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TablaServiceService } from './tabla-service.service';
import { users } from '../../types/users';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit, OnChanges {  

  private dataUsers: users[] =[]; 
  @Input() public  DataTable: any[] = []  
  // [['NOMBRE','name']] 
  // Posicion cero equivale al nombre de la columna 
  // Pocision uno equivale al la propiedad que va consumir de la data
  @Input() public ColumnAndRowData: Array<string[]> = [];  


  // valores boleanos para renderizar los buscadores
  @Input() public activeSearchInputColumn: boolean = true;   
  @Input() public activeSearchInputGlobal: boolean = true;  


  @Input() public Filters: any[] = []
  // [[Titulo, value, [...data] ]] 
  // el titulo es lo que nos mostrara el select, el cual es el primer dato del array es decir la posicion 0
  // el value es lo que contendra la propiedad value de la etiqueta option del select, este se encuentra en la posicion 1 del array 
  // el data debera ser un array de objetos que es la informacion que va contener el filtro




  // se crea un array secundario para que al momento de aplicar los filtros afectemos a este array y no al array principal que en este caso es la variable "DataTable"
  public RenderDataTable: any[] = []

  constructor( 
    private tablaService: TablaServiceService
   ){} 

  // al ser la variable DataTable asincrona, tendermos que esperar a que llegue la data para poder renderizar la informacion
  // por lo cual usamos el metodo ngOnchaces que nos va detectar cuando la data haya llegado y lo asignara a nuestro array secundario.
  ngOnChanges(changes: SimpleChanges): void { 
    if(changes['DataTable']){  
      this.RenderDataTable = changes['DataTable'].currentValue
    }
  }
; 

  async ngOnInit(): Promise<void> {   
  } 

  searchDataOrColumn(dataName: string, e:Event){ 
    let eventInputText = e.target as HTMLInputElement  
    let filterData = this.DataTable.filter((data)=>data[dataName].toLocaleLowerCase().includes(eventInputText.value.toLocaleLowerCase())); 

    this.RenderDataTable = filterData
  }
}
