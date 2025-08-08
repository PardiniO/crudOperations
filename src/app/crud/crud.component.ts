import { Component, OnInit } from '@angular/core';
import { iUsers, iCreateUser } from '../interfaces/users';
import { RegistroComponent } from "../components/registro/registro.component";
import { UserService } from '../services/user.service';
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})

export class CrudComponent implements OnInit{
  users: iUsers[] = []; 
  selectedUser: iUsers | null = null;
  modalRef: NgbModalRef | null = null;
  
  constructor(private userService: UserService, public modalService: NgbModal ) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  open(content: TemplateRef<any>, user?: iUsers): void {
    if (user) {
      this.selectedUser = { ...user };
    } else {
      this.selectedUser = { id: 0, name: '', email: '', gender: '' };
    }
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  close(): void {
    this.modalRef?.close();
    this.selectedUser = null;
  }

  onSubmit(form: any): void {
    if (!this.selectedUser) return;

    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    if (this.selectedUser.id === 0) {
      this.userService.addUser({
        name: this.selectedUser.name,
        email: this.selectedUser.email,
        gender: this.selectedUser.gender
      });
    } else {
      this.userService.updateUser(this.selectedUser);
    }

    this.users = this.userService.getUsers();
    this.close();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }
}