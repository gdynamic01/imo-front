
import { Adresse } from './../../models/adresse';
import { OffreService } from './../../service/apiImpl/offreimpl/offre.service';
import { Offre, OffreGlobal, Immobilier, Mobile, Photo } from '../../models/offres/offre';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';



@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  
  offreGlobal: OffreGlobal;
  immobilier: Immobilier;
  mobile: Mobile;
  adresse: Adresse;
  pathphoto: Photo;
  offre: Offre;

  myform:FormGroup;
  constructor( private fb: FormBuilder,
               private  offreservice: OffreService ) {

  
    this.offreGlobal= new OffreGlobal();
             
    
   
   }

  ngOnInit() {
    this.myform=this.fb.group({

      offre:this.fb.group({
        titre :this.fb.control("", Validators.required),
        description: this.fb.control("", Validators.required),
        prix: this.fb.control("", Validators.required),
        typeOffre: this.fb.control("", Validators.required),
        typeServiceOffre:this.fb.control("", Validators.required),


     }),

     mobile: this.fb.group({
      typeMobileMoteur: this.fb.control("", Validators.required),
        dateMiseEnCircualtion: this.fb.control("", Validators.required),
        model: this.fb.control("", Validators.required),

      }),

      pathphoto: this.fb.group({
        pathPhotos: this.fb.control("", Validators.required),
       
      }),

      immobilier: this.fb.group({
        surface: this.fb.control("", Validators.required),
      }),

      Adresse: this.fb.group({

        libelleRue: this.fb.control("", Validators.required),
        numeroRue: this.fb.control ("", Validators.required),
        complementAdresse: this.fb.control ("", Validators.required),
        pays: this.fb.control ("", Validators.required),
        ville: this.fb.control("", Validators.required),
        codePostal: this.fb.control("", Validators.required)

      })
     
    });

  }



 submitForm(){
    this.offreGlobal=this.myform.value;
    console.log( this.myform.value);
    console.log(this.offreGlobal);
    

    getMatIconFailedToSanitizeLiteralError(

 this.offreservice.creationOffre(this.offreGlobal).subscribe(  


    )

    

  }


}
