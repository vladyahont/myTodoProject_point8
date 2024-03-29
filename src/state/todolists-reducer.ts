import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {ReducerAction} from "react";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistId
    }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST",
        title: title
    }
}
export const ChangeTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: id
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter: filter,
        id: id
    }
}

type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistActionType | ChangeTodolistFilterActionType
 // type ActionType = ReducerAction<typeof RemoveTodolistAC> | ReducerAction<typeof AddTodolistAC>
 //     | ReducerAction<typeof ChangeTodolistAC> | ReducerAction<typeof ChangeTodolistFilterAC>

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsTypes): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state. filter(t => t.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state,
                {
                    id: v1(),
                    title: action.title,
                    filter: 'all'
                }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
            }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }



        default:
            throw new Error("I don't understand this action type")
    }
}
