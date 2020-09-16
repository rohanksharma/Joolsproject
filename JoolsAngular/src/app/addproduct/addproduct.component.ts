import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AddService } from '../services/AddService';
import { IMessageRes } from 'src/models/messages';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  public metallist:any =[{}];
  public metalpurityList:any = [];
  public imagefile:any;
  public productCategory:any = [];
  public productSubCategory:any = [];
  public whiteImages:any = [];
  public yellowimages:any = [];
  public roseImages:any = [];
  public metalList = [];
  public purityWt:string;
  public metalWt:string;
  public selectedItems:any = [];
  public metalListselectedItems:any = [];
  public stoneList:any = [{}];
  public finishYellow:string;
  public finishRose:string;
  public finishWhite:string;
  public dropdownSettings:IDropdownSettings;
  public metalListSettings:IDropdownSettings;
  public productdata = {};
  public resMessage={};
  public productDesigner:any = [];
  public selectedMetalPurity = [];
  public selectedMetal = [];
  public addStoneFlag:string;
  public stoneShapList:any =[];
  public stoneType:any = [];
  public stoneQualityList:any = [];
  myForm = new FormGroup({
   name: new FormControl('',[Validators.required, Validators.minLength(3)]),
   file: new FormControl('',[Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });

  constructor(private _addService: AddService,private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    
    this.spinnerService.show();
    this.getMetalPurity();
    
    this._addService.productCategory().subscribe((res: IMessageRes)=>{
        this.productCategory = res.data;
    });
       

    this._addService.getProductDesigner().subscribe((res: IMessageRes)=>{
        this.productDesigner = res.data;
    });

    this._addService.getStoneType().subscribe((res: IMessageRes)=>{
      this.stoneType = res.data;
  });

 
    this.metalList = [
      { item_id: 1, item_text: 'Gold' },
      { item_id: 2, item_text: 'Silver' },
      { item_id: 3, item_text: 'Platinum' }
    ];

  
   // console.log(this.dropdownList);

    this.selectedItems = [
     
    ];
   
  
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'purity',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.metalListSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll:false
    };

    this.spinnerService.hide();
  }

  
  onItemSelectMetalPurity(item: any) {
      // console.log(item);
    this.selectedMetalPurity.push(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onItemSelectMetal(item: any) {
      //console.log(item);
     this.selectedMetal.push(item);
   }

  addMetal()
  {
      this.metallist.push({});
  } 
  
  addStone()
  {
     // console.log(this.productdata);
      if(this.stoneList.length < 4){
        this.stoneList.push({});
      }   
  }

  removeStone(targetIndex){
    if(this.stoneList.length > 1){
      this.stoneList.splice(targetIndex, 1);
    }
  }


  removeMetal(targetIndex){
    if(this.metallist.length > 1){
      this.metallist.splice(targetIndex, 1);
    }
  }

  onFileChangeWhite(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.whiteImages.push(event.target.result); 
                   this.myForm.patchValue({
                      fileSource: this.whiteImages
                   });
                }
  
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  
  onFileChangeYellow(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.yellowimages.push(event.target.result); 
   
                   this.myForm.patchValue({
                      fileSource: this.yellowimages
                   });
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }


  onFileChangeRose(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.roseImages.push(event.target.result); 
   
                   this.myForm.patchValue({
                      fileSource: this.roseImages
                   });
                }
  
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }


    onChangeCategory(event){  
      this.spinnerService.show();
    this._addService.productSubCategory(event.srcElement.value).subscribe((res: IMessageRes)=>{
           this.productSubCategory = res.data;
           this.spinnerService.hide();
       });
      // console.log(this.productSubCategory);
    }

      addProductDetails(){
        this.spinnerService.show();
        this._addService.addproduct(this.productdata).subscribe((res: IMessageRes)=>{
              this.resMessage = res.data;
              this.spinnerService.hide();
        });
      }

      addProductMetal(){
        this.spinnerService.show();
        this._addService.addMetal(this.selectedMetalPurity,this.purityWt,this.metalWt,this.addStoneFlag).subscribe((res: IMessageRes)=>{
              this.resMessage = res.data;
              this.spinnerService.hide();
        });
      }

       getMetalPurity(){ 
        this.spinnerService.show(); 
      

        this._addService.getMetalPurity().subscribe((res: IMessageRes)=>{
               this.metalpurityList = res.data;
               this.spinnerService.hide();
           });
          // console.log(this.productSubCategory);
        }

        priceCalCulator(){
          this.spinnerService.show(); 
            this._addService.priceCalCulator(this.stoneList).subscribe((res: IMessageRes)=>{
            this.resMessage = res.data;
            this.spinnerService.hide();
          });
       }

       getStoneQuality(event){
        this.spinnerService.show(); 
                  
              this._addService.getStoneShap(event.srcElement.value).subscribe((res: IMessageRes)=>{
                this.stoneShapList = res.data;
            });
      
            this._addService.getStoneQuality(event.srcElement.value).subscribe((res: IMessageRes)=>{
              this.stoneQualityList = res.data;
              this.spinnerService.hide();
            });
       }
       

       onItemDeSelectMetalPurity(deselectedSID: any): void {
           this.selectedMetalPurity = this.selectedMetalPurity.filter(item => item.id !== deselectedSID.id);
       }

       fileStone(){
        this.spinnerService.show(); 
        this._addService.getMetalPurity().subscribe((res: IMessageRes)=>{
               this.metalpurityList = res.data;
               this.spinnerService.hide();
           });
          // console.log(this.productSubCategory);
        }

        uploadYellowImage(){
             this.spinnerService.show(); 
            this._addService.uploadFile(this.myForm.value,"Yellow").subscribe((res: IMessageRes)=>{
                this.metalpurityList = res.data;
                this.spinnerService.hide();
            });
        }

        uploadRoseImage(){
          this.spinnerService.show(); 
         this._addService.uploadFile(this.myForm.value,"Rose").subscribe((res: IMessageRes)=>{
             this.metalpurityList = res.data;
             this.spinnerService.hide();
         });
     }

     uploadWhiteImage(){
       this.spinnerService.show(); 
       this._addService.uploadFile(this.myForm.value,"White").subscribe((res: IMessageRes)=>{
         this.metalpurityList = res.data;
         this.spinnerService.hide();
     });
 }
}
