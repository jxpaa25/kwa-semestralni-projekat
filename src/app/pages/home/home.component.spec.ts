import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { Toy, toys } from '../../../db/toys.db';

function avgRating(toy: Toy): number {
  const r = toy.reviews ?? [];
  return r.length ? r.reduce((a, x) => a + x.rating, 0) / r.length : 0;
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads the whole catalog on init', () => {
    expect(component.toys().length).toBe(toys.length);
    expect(component.filteredToys().length).toBe(toys.length);
  });

  it('paginates ten toys per page', () => {
    expect(component.paginatedToys().length).toBe(10);
    expect(component.totalPages()).toBe(Math.ceil(toys.length / 10));
    expect(component.paginatedToys()[0].toyId).toBe(toys[0].toyId);
  });

  it('moves between pages and stays within bounds', () => {
    component.prevPage();
    expect(component.currentPage()).toBe(1);

    component.nextPage();
    expect(component.currentPage()).toBe(2);
    expect(component.paginatedToys()[0].toyId).toBe(toys[10].toyId);

    component.setPage(component.totalPages());
    component.nextPage();
    expect(component.currentPage()).toBe(component.totalPages());
  });

  it('renders one card per toy on the current page', () => {
    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll('a[href^="/toy/"]');
    expect(cards.length).toBe(10);
  });

  it('filters by name, case-insensitively', () => {
    component.searchName.set('SLAGALICA');
    const expected = toys.filter((t) => t.name.toLowerCase().includes('slagalica'));
    expect(expected.length).toBeGreaterThan(0);
    expect(component.filteredToys()).toEqual(expected);
  });

  it('derives the unique toy types and age groups from the catalog', () => {
    expect(component.uniqueTypes()).toEqual([...new Set(toys.map((t) => t.type.name))].sort());
    expect(component.uniqueAges()).toEqual([...new Set(toys.map((t) => t.ageGroup.name))].sort());
  });

  it('filters by type and age group', () => {
    const type = toys[0].type.name;
    const age = toys[0].ageGroup.name;
    component.searchType.set(type);
    component.searchAge.set(age);

    const result = component.filteredToys();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.type.name === type && t.ageGroup.name === age)).toBe(true);
  });

  it('filters by price range', () => {
    component.searchPriceMin.set(2000);
    component.searchPriceMax.set(3000);
    const result = component.filteredToys();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => t.price >= 2000 && t.price <= 3000)).toBe(true);
    expect(result.length).toBe(toys.filter((t) => t.price >= 2000 && t.price <= 3000).length);
  });

  it('filters by minimum average rating and excludes toys without reviews', () => {
    component.searchRatingMin.set(4.5);
    const result = component.filteredToys();
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((t) => (t.reviews?.length ?? 0) > 0 && avgRating(t) >= 4.5)).toBe(true);
    expect(toys.some((t) => !t.reviews?.length)).toBe(true);
    expect(result.some((t) => !t.reviews?.length)).toBe(false);
  });

  it('resets to the first page when a filter changes', () => {
    component.setPage(3);
    component.onFilterChange();
    expect(component.currentPage()).toBe(1);
  });

  it('computes the rounded average rating and review count', () => {
    const withReviews = toys.find((t) => (t.reviews?.length ?? 0) > 1)!;
    const info = component.getToyRatingInfo(withReviews);
    expect(info.count).toBe(withReviews.reviews!.length);
    expect(info.avg).toBe(parseFloat(avgRating(withReviews).toFixed(1)));

    const without = toys.find((t) => !t.reviews?.length)!;
    expect(component.getToyRatingInfo(without)).toEqual({ avg: 0, count: 0 });
  });
});
