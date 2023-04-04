import { HttpParams } from "@angular/common/http"

//esta interfaz representa los campos prioridad, estado y colaborador de la bd, lo hice de esta forma para no repertir codigo
export interface Campos_Interface{
    id: number, 
    nombre: string
}


export interface Tarea_Interface{
    id: number, 
    descripcion: string, 
    fechainicio: any, 
    fechafin: any,
    notas: string,
    colaborador: Campos_Interface,
    estado: Campos_Interface,
    prioridad: Campos_Interface
}

export interface Filtro_Interface{
    params?: HttpParams,
    todos: boolean
}
