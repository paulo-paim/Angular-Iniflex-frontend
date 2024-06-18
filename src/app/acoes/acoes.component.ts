import { Component, OnInit, inject, signal } from '@angular/core';
import { BackendService } from '../service/backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acoes.component.html',
  styleUrl: './acoes.component.scss'
})
export class AcoesComponent implements OnInit{

  
  public exibirTableAniversariantes = true;
  public mesesAniversario="";
  public PMaisVelho = true;
  public PSalariosTotais=true;
  public TableSalariosMinimos=true;

  #apibackendService = inject(BackendService)

  exibicaoPadrao:boolean = false;
  public nomeExcluir = "";
  public taxaAumento:number=1;
  serverHost:string="http://localhost:8080/funcionarios";
  public funcaoSelecionada:string ="";

  public getFuncionarios = signal<null | Array<{
    nome: string,
    dataNascimento:string,
    salario:string,
    funcao:string
  }>>(null)

  public getFuncionariosAniversariantes = signal<null | Array<Array<{
    nome: string,
    dataNascimento:string,
    salario:string,
    funcao:string
  }>>>(null)

  public getFuncionarioMaisVelho = signal<null | {
    nome: string,
    idade:number
  }>(null)

  public getSalariosTotais = signal<null | {
    salarioTotal: number
  }>(null)

  public getFuncionariosSalarioMinimo = signal<null | Array<{
    nome: string,
  dataNascimento: string,
  salario: string,
  funcao: string,
  salariosMinimos: string
  }>>(null)

  ngOnInit(): void {
    this.#apibackendService.httpListFuncionario$(this.serverHost+"/listagem").subscribe({
      next: (next) => this.getFuncionarios.set(next),
      error: (error) => console.log(error),
      complete: () => console.log('complete')

    });


  }


  excluir(){
    this.#apibackendService.httpListFuncionarioExcluir$(this.serverHost+"/remover/"+this.nomeExcluir).subscribe({
      next: (next) => this.getFuncionarios.set(next),
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    })
  }

  modificarExibicao(){
    
    if(this.exibicaoPadrao==true){
      this.#apibackendService.httpListFuncionario$(this.serverHost+"/listagem").subscribe({
        next: (next) => this.getFuncionarios.set(next),
        error: (error) => console.log(error),
        complete: () => console.log('complete')
  
      });
      this.exibicaoPadrao = false;
    }
    else{
      this.#apibackendService.httpListFuncionario$(this.serverHost+"/").subscribe({
        next: (next) => this.getFuncionarios.set(next),
        error: (error) => console.log(error),
        complete: () => console.log('complete')
  
      });
      this.exibicaoPadrao = true;
    }

  }

  aumentarSalario(){
    var aumento = this.taxaAumento.toString();
    this.#apibackendService.httpListFuncionario$(this.serverHost+"/aumentar-salario/"+aumento).subscribe({
      next: (next) => this.getFuncionarios.set(next),
      error: (error) => console.log(error),
      complete: () => console.log('complete')

    });
  }


  selecionarFuncao(){

    if(this.funcaoSelecionada==""){
      this.#apibackendService.httpListFuncionario$(this.serverHost+"/").subscribe({
        next: (next) => {this.getFuncionarios.set(next)},
        error: (error) => console.log(error),
        complete: () => console.log('complete')
  
      });

    }
    else{
      this.#apibackendService.httpListFuncionario$(this.serverHost+"/funcao"+this.funcaoSelecionada).subscribe({
        next: (next) => {this.getFuncionarios.set(next)},
        error: (error) => console.log(error),
        complete: () => console.log('complete')
  
      });
    }

  }

  buscarFuncionarioMaisVelho(){
    this.PMaisVelho=!this.PMaisVelho;
    this.#apibackendService.httpFuncionarioMaisVelho$(this.serverHost+"/maiorIdade").subscribe({
      next: (next) => {this.getFuncionarioMaisVelho.set(next)},
      error: (error) => console.log(error),
      complete: () => console.log('complete')
    });

    

  }


  ordenarOrdemAlfabetica(){
    this.#apibackendService.httpListFuncionario$(this.serverHost+"/ordemAlfabetica").subscribe({
      next: (next) => {this.getFuncionarios.set(next)},
      error: (error) => console.log(error),
      complete: () => console.log('complete')

    });
  }

  buscarSalariosTotais(){
    this.PSalariosTotais = !this.PSalariosTotais;
    this.#apibackendService.httpSalariosTotais$(this.serverHost+"/salariosTotais").subscribe({
      next: (next) => {this.getSalariosTotais.set(next)},
      error: (error) => console.log(error),
      complete: () => console.log('complete')

    });

    console.log(this.getSalariosTotais()?.salarioTotal)
  }



  buscarFuncionarioSalarioMinimo(){
    this.TableSalariosMinimos = !this.TableSalariosMinimos
    this.#apibackendService.httpFuncionarioSalarioMinimo$(this.serverHost+"/salariosMinimos").subscribe({
      next: (next) => this.getFuncionariosSalarioMinimo.set(next),
      error: (error) => console.log(error),
      complete: () => console.log('complete')

    });
  }

  consultarAniversariantes(){
    this.exibirTableAniversariantes = !this.exibirTableAniversariantes;
    this.#apibackendService.httpListFuncionariosAniversario$(this.serverHost+"/aniversariantes?"+"meses="+this.mesesAniversario).subscribe({
      next: (next) => this.getFuncionariosAniversariantes.set(next),
      error: (error) => console.log(error),
      complete: () => console.log('complete')

    });

    console.log(this.getFuncionariosAniversariantes)


  }

}

