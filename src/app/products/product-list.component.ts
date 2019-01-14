import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  filteredProducts: IProduct[];
  get listFilter(): string {
      return this._listFilter;
  }
  set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  // typescript declaration when data type is unknown or unimportant
  products: IProduct[] = [];
  constructor(private productService: ProductService) {
      this.listFilter = '';
  }
  onRatingClicked(msg: string): void {
      this.pageTitle = `Product List ${msg}`;
  }
  performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLowerCase();
      return this.products.filter((product: IProduct) =>
          product.productName.toLowerCase().indexOf(filterBy) !== -1);
  }
  // specified return type as void since it doesn't have one
  toggleImage(): void {
      this.showImage = !this.showImage;
  }
  ngOnInit(): void {
      this.products = this.productService.getProducts();
      this.filteredProducts = this.products;
  }
}
