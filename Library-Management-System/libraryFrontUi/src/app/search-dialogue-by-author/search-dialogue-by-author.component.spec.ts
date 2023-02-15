import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDialogueByAuthorComponent } from './search-dialogue-by-author.component';

describe('SearchDialogueByAuthorComponent', () => {
  let component: SearchDialogueByAuthorComponent;
  let fixture: ComponentFixture<SearchDialogueByAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDialogueByAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDialogueByAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
