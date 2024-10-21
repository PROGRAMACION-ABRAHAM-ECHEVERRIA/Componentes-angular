import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TablaServiceService } from './tabla-service.service';
// import { users } from '../../types/users';
import { filter } from 'rxjs';
import { fam } from '../../types/users';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit, OnChanges {  

  private dataUsers: fam[] =[]; 
  @Input() public  DataTable: any[] = []  
  // [['NOMBRE','name']] 
  // Posicion cero equivale al nombre de la columna 
  // Pocision uno equivale al la propiedad que va consumir de la data
  @Input() public ColumnAndRowData: Array<string[]> = [];  

  // array para renderizar las acciones
  @Input() public Acciones: Array<String[]> = []; 


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
  // se crea un array para almacenar los filtros de los selects
  private filtersCache: {namePropiedad: string, value: string, idInputSelect: number}[] = [];

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
    console.log(dataName);
    let eventInputText = e.target as HTMLInputElement  

    // validamos si existen concidencias con los buscadores
    let filterData = this.DataTable.filter((data)=>{   
      // convertimos todos los valores a cadenas de string, ya que pueden llegar valores numericos desde una API
      return String(data[dataName]).toLocaleLowerCase().includes(String(eventInputText.value.toLocaleLowerCase()))
    }); 

    this.RenderDataTable = filterData
  }   
   
  handleSelectedFilter(e:Event, ValueSearch: string,){ 
    let inputSelect = e.target as HTMLSelectElement;  
    let idInputSelect = parseInt(inputSelect.getAttribute('data-id') || '') 
    console.log(inputSelect.getAttribute('data-id')); 

    // verificando si el filtro ya existe dentro del array
    let findIndexFilter = this.filtersCache.findIndex(dataFilters=> dataFilters.idInputSelect === idInputSelect);

    // si el filtro ya existe simplemente se reemplaza su valor, si no existe se hace un push al array de filtros
    if(findIndexFilter !== -1){ 
      this.filtersCache[findIndexFilter].value = inputSelect.value; 
    }else{ 
      this.filtersCache.push({namePropiedad: ValueSearch, value: inputSelect.value, idInputSelect: idInputSelect });
    }

    // aplicando filtros
    let dataFilterRender = this.DataTable; 
    this.filtersCache.forEach((dataFilters)=>{  
      if(dataFilters.value === '') return
     dataFilterRender =  dataFilterRender.filter((dataRender) => { 
       return String(dataRender[dataFilters.namePropiedad]) === dataFilters.value 
      })
    });  

    this.RenderDataTable = dataFilterRender;
  }


}
