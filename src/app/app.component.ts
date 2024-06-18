import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BackendService } from './service/backend.service';
import { AcoesComponent } from './acoes/acoes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AcoesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
}
