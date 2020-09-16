import { Component, OnInit } from '@angular/core';
import { IMessageRes } from 'src/models/messages';
import { AddService } from 'src/app/services/AddService';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  



@Component({
  selector: 'app-productstone',
  templateUrl: './productstone.component.html',
  styleUrls: ['./productstone.component.css']
})
export class ProductstoneComponent implements OnInit {
  constructor(private _addService:AddService,private spinnerService: NgxSpinnerService) { }

  public centerstonename:string = 'Center Stone';
  public centerstonetype:string;
  public centerstoneshapecode:string;
  public centerstonetotalwt:string;
  public centerstonepieces:string;
  public accentstone1name:string = 'Accent Stone1';
  public accentstone1type:string;
  public accentstone1shap:string;
  public accentstone1totalwt:string;
  public accentstone1pieces:string;
  public accentstone2name:string = 'Accent Stone2';
  public accentstone2type:string;
  public accentstone2shap:string;
  public accentstone2totalwt:string;
  public accentstone2pieces:string;
  public centerstonequality:any = [];
  public accentstone1quality:any = [];
  public accentstone2quality:any = [];
  public centerstoneShapList:any = [];
  public accentstone1ShapList:any = [];
  public accentstone2ShapList:any = []; 
  public centerstonequalitymodel:string;
  public accentstone1qualitymodel:string;
  public accentstone2qualitymodel:string;
  public centerstonequalityList:any = [];
  public accentstone1qualityList:any = [];
  public accentstone2qualityList:any = [];
  public stoneShapList:any = [];
  public stoneType:any = [];
  public resMessage:any={};
  public dropdownSettings:IDropdownSettings;
  public accentStone1QualitySetting:IDropdownSettings;
  public accentStone2QualitySetting:IDropdownSettings;
  public stoneList:any = [];

  ngOnInit(): void {
         this.spinnerService.show();
            this._addService.getStoneType().subscribe((res: IMessageRes)=>{
              this.stoneType = res.data;
          });

        this.dropdownSettings = {
          singleSelection: false,
          idField: 'id',
          textField: 'quality',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll:false
        };

        this.accentStone1QualitySetting = {
          singleSelection: false,
          idField: 'id',
          textField: 'quality',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll:false
        };

        this.accentStone2QualitySetting = {
          singleSelection: false,
          idField: 'id',
          textField: 'quality',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll:false
        };

  }

  onCenterStoneQuality(item: any) {
    //console.log(item);
   this.centerstonequality.push(item);
 }   

 onAccentStone1Quality(item: any) {
  //console.log(item);
 this.accentstone1quality.push(item);
}

onAccentStone2Quality(item: any) {
  //console.log(item);
 this.accentstone2quality.push(item);
}

onSelectAll(items: any) {
  console.log(items);
}

onchange(stone_name,event){
  //console.log(item);
  
    console.log(event.target.value);

  if(stone_name == "center_stone"){
    this.centerstonequality = [];
    this.spinnerService.show();
          
    this._addService.getStoneShap(event.srcElement.value).subscribe((res: IMessageRes)=>{
      this.centerstoneShapList = res.data;
     });
    this._addService.getStoneQuality(event.target.value).subscribe((res: IMessageRes)=>{
      this.centerstonequalityList = res.data;
      this.spinnerService.hide();
    });
  }

  if(stone_name == "accent_stone1"){
    this.accentstone1quality = [];
    this.spinnerService.show();
           
    this._addService.getStoneShap(event.srcElement.value).subscribe((res: IMessageRes)=>{
      this.accentstone1ShapList = res.data;
  });
    this._addService.getStoneQuality(event.target.value).subscribe((res: IMessageRes)=>{
      this.accentstone1qualityList = res.data;
      this.spinnerService.hide();
    });
  }

  if(stone_name == "accent_stone2"){
    this.accentstone2quality = [];
    this.spinnerService.show();

          
    this._addService.getStoneShap(event.srcElement.value).subscribe((res: IMessageRes)=>{
      this.accentstone2ShapList = res.data;
  });
    this._addService.getStoneQuality(event.target.value).subscribe((res: IMessageRes)=>{
      this.accentstone2qualityList = res.data;
      this.spinnerService.hide();
    });
  }
 
}

   addStoneApi(){

    var formData = {};
   // formData.append("centerstonename")=this.centerstonename;
    formData["centerstonename"]= this.centerstonename;
    formData["centerstonetype"] =this.centerstonetype;
    formData["centerstoneshapecode"] = this.centerstoneshapecode;
    formData["centerstonetotalwt"] = this.centerstonetotalwt;
    formData["centerstonepieces"] = this.centerstonepieces;
    formData["centerstonequality"] = this.centerstonequality;
    formData["accentstone1name"] =  this.accentstone1name;
    formData["accentstone1type"] = this.accentstone1type;
    formData["accentstone1shap"] = this.accentstone1shap;
    formData["accentstone1totalwt"] = this.accentstone1totalwt;
    formData["accentstone1pieces"] = this.accentstone1pieces;
    formData["accentstone1quality"] = this.accentstone1quality;
    formData["accentstone2name"] = this.accentstone2name;
    formData["accentstone2type"] = this.accentstone2type;
    formData["accentstone2shap"] = this.accentstone2shap;
    formData["accentstone2totalwt"] = this.accentstone2totalwt;
    formData["accentstone2pieces"] = this.accentstone2pieces;
    formData["accentstone2quality"] = this.accentstone2quality;
    this._addService.addStone(formData).subscribe((res: IMessageRes)=>{
       this.resMessage = res.data;
     });

  }

  onItemDeSelectAccentStone1(deselectedSID: any): void {
   // console.log(deselectedSID);
    this.accentstone1quality = this.accentstone1quality.filter(item => item.id !== deselectedSID.id);
  }

  onItemDeSelectAccentStone2(deselectedSID: any): void {
    // console.log(deselectedSID);
     this.accentstone2quality = this.accentstone2quality.filter(item => item.id !== deselectedSID.id);
   }
 

   onItemDeSelectCenterStoneQuality(deselectedSID: any): void {
    // console.log(deselectedSID);
     this.centerstonequality = this.centerstonequality.filter(item => item.id !== deselectedSID.id);
   }
   

  priceCalCulator(){
    this.spinnerService.show();
    this._addService.priceCalCulator(this.stoneList).subscribe((res: IMessageRes)=>{
    this.resMessage = res.data;
    this.spinnerService.hide();
  });
}

public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  

 
}
