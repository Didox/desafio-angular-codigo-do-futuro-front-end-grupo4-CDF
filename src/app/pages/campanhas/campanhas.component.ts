import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ProdutoServico } from 'src/app/servicos/produtoServico';
import { Produto } from 'src/app/models/produto';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanhaService } from 'src/app/servicos/campanha.service';
import { PosicoesProdutoService } from 'src/app/servicos/posicoes-produto.service';
import { Campanha } from 'src/app/models/campanha';
import { PosicoesProduto } from 'src/app/models/posicoesProduto';


@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.css']
})
export class CampanhasComponent implements OnInit {

  constructor(
    private produtoService: ProdutoServico,
    private campanhaService: CampanhaService,
    private posicoesProdutoService: PosicoesProdutoService,
    private router: Router,
    private routerParams: ActivatedRoute,
  ) { }

  public produtos: Produto[] | undefined = [];
  public prateleira: Produto[] | undefined = [];
  public prateleira2: Produto[] | undefined = [];
  public prateleira3: Produto[] | undefined = [];
  public posicaox = 0
  public posicaoy = 0
  public campanha: Campanha = {} as Campanha
  public posicaoProduto: PosicoesProduto = {} as PosicoesProduto

  ngOnInit(): void {
    this.listaProdutos();
    this.getlasCampanha();
  }

async getlasCampanha(){
 this.campanha = await this.campanhaService.getLast();
}

atualizarCampanha(){
  this.campanhaService.update(this.campanha);
  this.router.navigateByUrl("/campanhas");
}

criarPosicaoProduto(){
  this.posicaoProduto.posicaoX = this.posicaox
  this.posicaoProduto.posicaoY = this.posicaoy
  this.posicaoProduto.campanha_id = this.campanha.id
  this.posicoesProdutoService.criar(this.posicaoProduto);
}

  getElement(produto:string){
    var posicao: HTMLElement = document.getElementById(produto); 
    var posicaoDom: DOMRect = posicao.getBoundingClientRect();
    this.posicaox = posicaoDom.x
    this.posicaoy = posicaoDom.y
    console.log(this.posicaoProduto)
    this.criarPosicaoProduto();
    console.log(this.posicaox)
    console.log(this.posicaoy)
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
        event.currentIndex
        );
    }
  }
}

