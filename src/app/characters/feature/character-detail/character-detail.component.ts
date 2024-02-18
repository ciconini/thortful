import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { CommonModule } from '@angular/common'
import { CharacterService } from '../../data-access/character.service'
import { Character } from '../../util/model/character'
import { UrlUtil } from '../../../shared/util/data-method/url'
import { NotFoundComponent } from '../../../shared/ui/not-found/not-found.component'
import { Title } from '@angular/platform-browser'
import { LoadingComponent } from '../../../shared/ui/loading/loading.component'

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LoadingComponent, 
    NotFoundComponent
  ],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss'
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  character: Character = {} as Character;
  sub: Subscription = new Subscription;
  loading: boolean = true;
  error: boolean = false;

  constructor(
    private readonly peopleService: CharacterService,
    private readonly route: ActivatedRoute,
    public readonly url: UrlUtil,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if(params['id']){
        this.sub = this.peopleService.getCharacter(params['id']).subscribe((resp: Character) => {
          this.character = resp;
          this.title.setTitle(`${resp.name} - Characters - Star Wars wiki`);
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        })
      }
    })
  }

  bgImg(character: Character): string {
    return `url(${this.url.normalizeUrl(character.name, 'characters')})`
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
