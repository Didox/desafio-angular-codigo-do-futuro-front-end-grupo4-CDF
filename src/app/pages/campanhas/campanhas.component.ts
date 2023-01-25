import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { Produto } from 'src/app/models/produto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.css']
})
export class CampanhasComponent implements OnInit {

  constructor(
    private produtoService: ProdutoServico,
    private router: Router,
  ) { }

  public produtos: Produto[] | undefined = [];
  public prateleira: Produto[] | undefined = [];
  public prateleira2: Produto[] | undefined = [];
  public prateleira3: Produto[] | undefined = [];


  ngOnInit(): void {
    this.listaProdutos();
  }

 async listaProdutos(){
 this.produtos = await this.produtoService.lista();
  }

  drop(event: CdkDragDrop<Produto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

