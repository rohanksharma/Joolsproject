import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/AddService';
import { NgxSpinnerService } from 'ngx-spinner';
import { IMessageRes } from 'src/models/messages';
import { GetproductdetailsService } from '../services/getproductdetails.service';

@Component({
  selector: 'app-sku-list',
  templateUrl: './sku-list.component.html',
  styleUrls: ['./sku-list.component.css']
})
export class SkuListComponent implements OnInit {


  public productskulist = [];
  constructor(private _getproductdetails: GetproductdetailsService,private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    
         this.spinnerService.show();
        var shopifyproduct_id = 4508968288298;
        this._getproductdetails.getSkuList(shopifyproduct_id).subscribe((res: IMessageRes)=>{
            this.productskulist = res.data;
            this.spinnerService.hide();
        });
  }

}
