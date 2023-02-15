import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDialogueGenreComponent } from './search-dialogue-genre.component';

describe('SearchDialogueGenreComponent', () => {
  let component: SearchDialogueGenreComponent;
  let fixture: ComponentFixture<SearchDialogueGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDialogueGenreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDialogueGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
