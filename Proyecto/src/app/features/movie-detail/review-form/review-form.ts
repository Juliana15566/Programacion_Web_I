import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html'
})
export class ReviewForm {
  private fb = inject(FormBuilder);

  formulario = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    contenido: ['', [Validators.required, Validators.minLength(20)]],
    puntuacion: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
    recomendada: [true]
  });

  enviado = false;

  tieneError(campo: string, error: string): boolean {
    const control = this.formulario.get(campo);
    return !!control?.hasError(error) && !!control?.touched;
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      console.log('Datos de la reseña:', this.formulario.value);
      this.enviado = true;
      this.formulario.reset({ puntuacion: 5, recomendada: true });
    }
  }
}