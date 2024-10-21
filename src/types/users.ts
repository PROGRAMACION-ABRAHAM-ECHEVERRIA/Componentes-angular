export interface fam { 
  CVEFAM : number
  CVEMF : number
  CveEstatus : string
  DESFAM : string
  FECHAREAL : string
  FechaAlta : string
  FechaBaja : string
  FechaMod : string
  LOGIN : string
  Pre : boolean
  TIPOFAM : number
  UsuarioAlta : string
  UsuarioBaja : string
  UsuarioMod : string
  } 

  export interface res  { 
    data: fam []; 
    error: boolean; 
    mensaje: string; 
    estatus: number; 
  }