import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService, Todo } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = []; // Lista começa vazia
  newTodoTitle: string = '';

  constructor(private todoService: TodoService) {}

  addTodo(): void {
    if (!this.newTodoTitle.trim()) {
      alert('Campo esta em branco, digite uma tarefa por favor!')
      return;
    }
      const newTodo: Todo = {
        title: this.newTodoTitle,
        completed: false,
        id: this.todos.length + 1 // Simula um ID local
      };
      this.todoService.addTodo(newTodo).subscribe(todo => {
        this.todos.push({ ...todo, id: newTodo.id }); // Adiciona localmente
        this.newTodoTitle = '';
      });
  }

  toggleTodo(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id!, updatedTodo).subscribe(() => {
      todo.completed = updatedTodo.completed;
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }
}