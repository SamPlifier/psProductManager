import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    item: string;
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {
      const id = +this.route.snapshot.paramMap.get('id');
      let item = this.item;
      this.pageTitle += `: Item ${id}`;
      this.productService.getProducts().subscribe(
          product => {
              for (item in product) {
                  if (product[item].productId === id) {
                      this.product = product[item];
                  }
              }
          }
      );
  }
  onBack(): void {
      this.router.navigate(['/products']);
  }

}
