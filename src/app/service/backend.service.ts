import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Funcionario {
  nome: string,
  dataNascimento:string,
  salario:string,
  funcao:string
}


interface funcionarioMaisVelho{
  nome: string,
  idade: number
}

interface totalSalarios{
  salarioTotal: number
}

interface funcionarioSalarioMinimo{
  nome: string,
  dataNascimento: string,
  salario: string,
  funcao: string,
  salariosMinimos: string
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  #http = inject(HttpClient);


  public httpListFuncionario$(url:string): Observable<Array<Funcionario>>{
    return this.#http.get<Funcionario[]>(url);
  }

  public httpListFuncionariosAniversario$(url:string): Observable<Array<Array<Funcionario>>>{
    return this.#http.get<Funcionario[][]>(url);
  }

  public httpFuncionarioMaisVelho$(url:string): Observable<funcionarioMaisVelho>{
    return this.#http.get<funcionarioMaisVelho>(url);
  }

  public httpSalariosTotais$(url:string): Observable<totalSalarios>{
    return this.#http.get<totalSalarios>(url);
  }

  public httpFuncionarioSalarioMinimo$(url:string): Observable<Array<funcionarioSalarioMinimo>>{
    return this.#http.get<funcionarioSalarioMinimo[]>(url);
  }
}
