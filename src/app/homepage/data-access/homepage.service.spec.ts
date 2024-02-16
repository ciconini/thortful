import { TestBed } from '@angular/core/testing';
import { HomepageService } from './homepage.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { POSTS } from './posts-mock'
import { Post } from '../util/model/post'

describe('HomepageService', () => {
  let service: HomepageService,
    httpTestingController: HttpTestingController,
    posts = POSTS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ HomepageService ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HomepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get news posts', () => {
    service.getPosts().subscribe((posts: Post[]) => {
      expect(posts).withContext("must bring posts").toBeTruthy();
      expect(posts.length).toEqual(4);
      expect(posts[0].title).toEqual("Ships Of The Galaxy: The Marauder");
    });

    const req = httpTestingController.expectOne("assets/data/posts.json");

    expect(req.request.method).toEqual("GET");

    req.flush(POSTS);
  })
});
