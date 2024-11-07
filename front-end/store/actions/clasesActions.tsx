import { IClasesItem, IpaginatedClases } from '../models'

export enum ClasesActionTypes {
  SEARCH_CLASES = 'clases/search',
  SEARCHING_CLASES = 'clases/searching',
  FOUND_CLASES = 'clases/found',
  SEARCHING_CLASES_FAILED = 'clases/searching_failed',

  LOAD_CLASES = 'clases/load',
  LOADING_CLASES = 'clases/loading',
  LOADED_CLASES = 'clases/loaded',
  LOADING_CLASES_FAILED = 'clases/loading_failed',

  ADD_CLASES = 'clases/add',
  ADDING_CLASES = 'clases/adding',
  ADDED_CLASES = 'clases/added',
  ADDING_CLASES_FAILED = 'clases/adding_failed',

  REMOVE_CLASE = 'clases/remove',
  REMOVING_CLASE = 'clases/removing',
  REMOVED_CLASE = 'clases/removed',
  REMOVING_CLASE_FAILED = 'clases/removing_failed',

  EDIT_CLASES = 'clases/edit',
  EDITING_CLASES = 'clases/editing',
  EDITED_CLASES = 'clases/edited',
  EDITING_CLASES_FAILED = 'clases/editing_failed',
}

export function searchClases(searchOptions: TSearchOptions | string, keep?: boolean): ISearchClasesAction {
  return {
    type: ClasesActionTypes.SEARCH_CLASES,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingClases(): ISearchingClasesAction {
  return {
    type: ClasesActionTypes.SEARCHING_CLASES,
  }
}

export function foundClases(clases: IpaginatedClases, keep?: boolean): IFoundClasesAction {
  return {
    type: ClasesActionTypes.FOUND_CLASES,
    keep: keep,
    payload: {
      clases,
    },
  }
}

export function searchingClasesFailed(): ISearchingClasesFailedAction {
  return {
    type: ClasesActionTypes.SEARCHING_CLASES_FAILED,
  }
}

export function loadClases(loadOptions: TSearchOptions): ILoadClasesAction {
  return {
    type: ClasesActionTypes.LOAD_CLASES,
    loadOptions: loadOptions,
  }
}

export function loadingClases(): ILoadingClasesAction {
  return {
    type: ClasesActionTypes.LOADING_CLASES,
  }
}

export function loadedClases(clases: IpaginatedClases): ILoadedClasesAction {
  return {
    type: ClasesActionTypes.LOADED_CLASES,
    payload: {
      clases,
    },
  }
}

export function loadingClasesFailed(): ILoadingClasesFailedAction {
  return {
    type: ClasesActionTypes.LOADING_CLASES_FAILED,
  }
}

export function addClases(clase: IClasesItem): IAddClasesAction {
  return {
    type: ClasesActionTypes.ADD_CLASES,
    payload: clase,
  }
}

export function addingClases(): IAddingClasesAction {
  return {
    type: ClasesActionTypes.ADDING_CLASES,
  }
}

export function addedClases(clases: IpaginatedClases): IAddedClasesAction {
  return {
    type: ClasesActionTypes.ADDED_CLASES,
    payload: {
      clases,
    },
  }
}

export function addingClasesFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingClasesFailedAction {
  return {
    type: ClasesActionTypes.ADDING_CLASES_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeClase(clase: IClasesItem): IRemoveClaseAction {
  return {
    type: ClasesActionTypes.REMOVE_CLASE,
    payload: clase,
  }
}

export function removingClase(): IRemovingClaseAction {
  return {
    type: ClasesActionTypes.REMOVING_CLASE,
  }
}

export function removedClase(): IRemovedClaseAction {
  return {
    type: ClasesActionTypes.REMOVED_CLASE,
  }
}

export function removingClaseFailed(): IRemovingClaseFailedAction {
  return {
    type: ClasesActionTypes.REMOVING_CLASE_FAILED,
  }
}

export function editClases(clase: IClasesItem): IEditClasesAction {
  return {
    type: ClasesActionTypes.EDIT_CLASES,
    payload: clase,
  }
}

export function editingClases(): IEditingClasesAction {
  return {
    type: ClasesActionTypes.EDITING_CLASES,
  }
}

export function editedClases(clases: IClasesItem): IEditedClasesAction {
  return {
    type: ClasesActionTypes.EDITED_CLASES,
    payload: clases,
  }
}

export function editingClasesFailed(): IEditingClasesFailedAction {
  return {
    type: ClasesActionTypes.EDITING_CLASES_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchClasesAction {
  type: ClasesActionTypes.SEARCH_CLASES
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingClasesAction {
  type: ClasesActionTypes.SEARCHING_CLASES
}

export interface IFoundClasesAction {
  type: ClasesActionTypes.FOUND_CLASES
  keep?: boolean
  payload: {
    clases: IpaginatedClases
  }
}

export interface ISearchingClasesFailedAction {
  type: ClasesActionTypes.SEARCHING_CLASES_FAILED
}

export interface ILoadClasesAction {
  type: ClasesActionTypes.LOAD_CLASES
  loadOptions: TSearchOptions
}

export interface ILoadingClasesAction {
  type: ClasesActionTypes.LOADING_CLASES
}

export interface ILoadedClasesAction {
  type: ClasesActionTypes.LOADED_CLASES
  payload: {
    clases: IpaginatedClases
  }
}

export interface ILoadingClasesFailedAction {
  type: ClasesActionTypes.LOADING_CLASES_FAILED
}

export interface IAddClasesAction {
  type: ClasesActionTypes.ADD_CLASES
  payload: IClasesItem
}

export interface IAddingClasesAction {
  type: ClasesActionTypes.ADDING_CLASES
}

export interface IAddedClasesAction {
  type: ClasesActionTypes.ADDED_CLASES
  payload: {
    clases: IpaginatedClases
  }
}

export interface IAddingClasesFailedAction {
  type: ClasesActionTypes.ADDING_CLASES_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveClaseAction {
  type: ClasesActionTypes.REMOVE_CLASE
  payload: IClasesItem
}

export interface IRemovingClaseAction {
  type: ClasesActionTypes.REMOVING_CLASE
}

export interface IRemovedClaseAction {
  type: ClasesActionTypes.REMOVED_CLASE
}

export interface IRemovingClaseFailedAction {
  type: ClasesActionTypes.REMOVING_CLASE_FAILED
}

export interface IEditClasesAction {
  type: ClasesActionTypes.EDIT_CLASES
  payload: IClasesItem
}

export interface IEditingClasesAction {
  type: ClasesActionTypes.EDITING_CLASES
}

export interface IEditedClasesAction {
  type: ClasesActionTypes.EDITED_CLASES
  payload: IClasesItem
}

export interface IEditingClasesFailedAction {
  type: ClasesActionTypes.EDITING_CLASES_FAILED
}

export type ClasesAction =
  | ISearchClasesAction
  | ISearchingClasesAction
  | IFoundClasesAction
  | ISearchingClasesFailedAction
  | ILoadClasesAction
  | ILoadingClasesAction
  | ILoadedClasesAction
  | ILoadingClasesFailedAction
  | IAddClasesAction
  | IAddingClasesAction
  | IAddedClasesAction
  | IAddingClasesFailedAction
  | IRemoveClaseAction
  | IRemovingClaseAction
  | IRemovedClaseAction
  | IRemovingClaseFailedAction
  | IEditClasesAction
  | IEditingClasesAction
  | IEditedClasesAction
  | IEditingClasesFailedAction
