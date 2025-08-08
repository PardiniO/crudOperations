import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit{
  registroForm!: FormGroup;
  enviado = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.registroForm = this.formBuilder.group({
        name:['', [Validators.required, Validators.minLength(3)]],
        lastName:['', [Validators.required, Validators.minLength(3)]],
        email:['', [Validators.required, Validators.email]],
        domicile:['', [Validators.required]],
        phone:['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        municipality:['', [Validators.required]],
        province:['', [Validators.required]],
      });
  }

  
  // Método para obtener facilmente un campo del formulario
  getControl(campo: string) {
    return this.registroForm.get(campo);
  }

  // Verificar si un campo tiene error
  tieneError(campo: string): boolean {
    const control = this.getControl(campo);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

// Obtener mensaje de error
  getMensajeError(campo: string): string {
    const control = this.getControl(campo);

    if(control?.hasError('required')) {
      return `${campo} es obligatorio`;
    }
    if(control?.hasError('email')) {
      return 'Email invalido';
    }
    if(control?.hasError('minlength')) {
      return `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if(control?.hasError('pattern')) {
      return 'Telefono debe ser solo números';
    }
  return '';
  }

  onSubmit() {
    if(this.registroForm.invalid) {
      // Marcar todos los campos para mostrar errores
      this.registroForm.markAllAsTouched();
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }
    
    this.enviado = true;
    console.log('Datos del formulario:', this.registroForm.value);

    // Simular envío al servidor
    setTimeout(() =>  {
      console.log('Usuario registrado:', this.registroForm.value);
      alert('Usuario registrado exitosamente');
    }, 1000);
  }
}
