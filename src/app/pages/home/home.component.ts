import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToyService } from '../../services/toy.service';
import { Toy } from '../../../db/toys.db';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private toyService = inject(ToyService);
  protected readonly Math = Math;

  toys = signal<Toy[]>([]);
  currentPage = signal<number>(1);
  pageSize = 10;

  // Search/Filter signals
  searchName = signal<string>('');
  searchDesc = signal<string>('');
  searchType = signal<string>('');
  searchAge = signal<string>('');
  searchTarget = signal<string>('');
  searchDateFrom = signal<string>('');
  searchDateTo = signal<string>('');
  searchPriceMin = signal<number | null>(null);
  searchPriceMax = signal<number | null>(null);
  searchRatingMin = signal<number | null>(null);
  searchRatingMax = signal<number | null>(null);

  // Extract unique options for selects
  uniqueTypes = computed(() => {
    const types = new Set(this.toys().map(t => t.type.name));
    return Array.from(types).sort();
  });
  
  uniqueAges = computed(() => {
    const ages = new Set(this.toys().map(t => t.ageGroup.name));
    return Array.from(ages).sort();
  });

  filteredToys = computed(() => {
    let result = this.toys();
    
    const sName = this.searchName().toLowerCase();
    if (sName) result = result.filter(t => t.name.toLowerCase().includes(sName));
    
    const sDesc = this.searchDesc().toLowerCase();
    if (sDesc) result = result.filter(t => t.description.toLowerCase().includes(sDesc));
    
    const sType = this.searchType();
    if (sType) result = result.filter(t => t.type.name === sType);
    
    const sAge = this.searchAge();
    if (sAge) result = result.filter(t => t.ageGroup.name === sAge);
    
    const sTarget = this.searchTarget();
    if (sTarget) result = result.filter(t => t.targetGroup === sTarget);
    
    const sDateFrom = this.searchDateFrom();
    if (sDateFrom) result = result.filter(t => t.productionDate >= sDateFrom);
    
    const sDateTo = this.searchDateTo();
    if (sDateTo) result = result.filter(t => t.productionDate <= sDateTo);
    
    const minPrice = this.searchPriceMin();
    if (minPrice !== null && minPrice !== undefined) result = result.filter(t => t.price >= minPrice);
    
    const maxPrice = this.searchPriceMax();
    if (maxPrice !== null && maxPrice !== undefined) result = result.filter(t => t.price <= maxPrice);

    const minRating = this.searchRatingMin();
    const maxRating = this.searchRatingMax();
    
    if ((minRating !== null && minRating !== undefined) || (maxRating !== null && maxRating !== undefined)) {
      result = result.filter(t => {
        const toyReviews = t.reviews || [];
        if (toyReviews.length === 0) return false;
        
        const avgRating = toyReviews.reduce((acc, r) => acc + r.rating, 0) / toyReviews.length;
        
        let matchesMin = minRating !== null ? avgRating >= minRating : true;
        let matchesMax = maxRating !== null ? avgRating <= maxRating : true;
        
        return matchesMin && matchesMax;
      });
    }

    return result;
  });

  paginatedToys = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filteredToys().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => Math.ceil(this.filteredToys().length / this.pageSize));

  ngOnInit(): void {
    this.toyService.getToys().subscribe(data => {
      this.toys.set(data);
    });
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  setPage(page: number): void {
    this.currentPage.set(page);
  }
  
  onFilterChange(): void {
    this.currentPage.set(1);
  }

  getToyRatingInfo(toy: Toy) {
    const toyReviews = toy.reviews || [];
    if (toyReviews.length === 0) return { avg: 0, count: 0 };
    const avg = toyReviews.reduce((acc, r) => acc + r.rating, 0) / toyReviews.length;
    return { avg: parseFloat(avg.toFixed(1)), count: toyReviews.length };
  }
}
