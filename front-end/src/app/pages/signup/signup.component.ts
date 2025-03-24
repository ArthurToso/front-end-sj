import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.signupForm = this.formBuilder.group({
      cep: [''],
      rua: [''],
      cidade: [''],
      estado: ['']
    });
  }
   
  buscarCep() {
    const cep	= this.signupForm.get('cep')?.value;
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((dados: any) => {
      if (!dados.erro) {
        this.signupForm.patchValue({
          rua: dados.logradouro,
          cidade: dados.localidade,
          estado: dados.uf
        });
      } else {
        alert('CEP não encontrado');
      }
    });
  }

  onSignup() {
    const formData = this.signupForm.value;
    console.log('Enviando: ', formData);

    this.http.post('http://localhost:3000/signup', formData).subscribe(response => {
      console.log('Resposta do servidor: ', response);
    }, error => {
      console.error('Erro ao enviar dados: ', error);
    });
    
  }

}
