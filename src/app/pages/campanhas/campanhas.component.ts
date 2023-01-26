import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { Produto } from 'src/app/models/produto';
import { Router } from '@angular/router';
import { CampanhaService } from 'src/app/servicos/campanha.service';


@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.css']
})
export class CampanhasComponent implements OnInit {

  constructor(
    private produtoService: ProdutoServico,
    private campanhaService: CampanhaService,
    private router: Router,
  ) { }

  public produtos: Produto[] | undefined = [];
  public prateleira: Produto[] | undefined = [];
  public prateleira2: Produto[] | undefined = [];
  public prateleira3: Produto[] | undefined = [];


  
  ngOnInit(): void {
    this.listaProdutos();
  }

  getElement(){
    var posicao: HTMLElement = document.getElementById('produto'); 
    var posicaoDom: DOMRect = posicao.getBoundingClientRect();
    var posisaox = posicaoDom.x
    var posicaoy = posicaoDom.y
    console.log(posisaox)
    console.log(posicaoy)
  }

 async listaProdutos(){
 this.produtos = await this.produtoService.lista();
  }


  drop(event: CdkDragDrop<Produto[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("entra aqui o ocnsole?")
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

