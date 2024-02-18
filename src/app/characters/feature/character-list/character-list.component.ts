import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { CharacterService } from '../../data-access/character.service'
import { PageControl } from '../../../shared/util/model/page-control'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { CharacterResponse, Character } from '../../util/model/character'
import { PageTitleComponent } from '../../../shared/ui/page-title/page-title.component'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component'
import { Card } from '../../../shared/util/model/card'
import { CardComponent } from '../../../shared/ui/card/card.component'
import { Title } from '@angular/platform-browser'
import { ObjectId } from '../../../shared/util/data-method/object-id'

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule, 
    CardComponent, 
    PageTitleComponent, 
    LoadingComponent, 
    PaginationComponent
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent implements OnInit, OnDestroy {
  character: Character[] = [];
  pageControl: PageControl = new PageControl;
  characterSub: Subscription = new Subscription;
  loading: boolean = true;
  cards: Card[] = [];
  
  constructor(
    private readonly characterService: CharacterService,
    private readonly route: ActivatedRoute,
    private readonly objectUtil: ObjectId,
    private readonly router: Router,
    private title: Title
  ) {
    this.title.setTitle(`Characters - ${this.title.getTitle()}`);
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if(params['page']) {
        this.pageControl.page = Number(params['page']);
      } else {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: 1
          }
        })
      }
      this.characterSub = this.characterService.getCharacters(this.pageControl).subscribe((resp: CharacterResponse) => {
        this.cards = resp.results.map((e) => {
          return {
            id: this.objectUtil.getId(e.url),
            name: e.name,
            type: 'characters'
          }
        });
        this.pageControl.count = resp.count;
        this.loading = false;
      });
    })
  }

  goToPage(event:any): void {
    this.router.navigate(["/characters"],{queryParams: {page: event}})
  }

  ngOnDestroy(): void {
    this.characterSub.unsubscribe();
  }
}
