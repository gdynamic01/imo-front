import { Adresse } from './../../models/adresse';
import { OffreService } from './../../service/apiImpl/offreimpl/offre.service';

import { Offres } from './../../models/offres/offres';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {

  offre: Offres;
  myform:FormGroup;
  constructor( private fb: FormBuilder,
               private  offreservice: OffreService ) {

  
    this.offre= new Offres();
    
   
   }

  ngOnInit() {
    this.myform=this.fb.group({

      titre : this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      prix: this.fb.control("", Validators.required),
      surface: this.fb.control("", Validators.required),
      duree: this.fb.control("", Validators.required),
      typeOffre: this.fb.control("", Validators.required),
      typeServiceOffre: this.fb.control("", Validators.required),
      typemoteur: this.fb.control("", Validators.required),
      datecirculation:this.fb.control("", Validators.required),
      pathPhotos:this.fb.control("", Validators.required),

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
    this.offre=this.myform.value;

   this.offreservice.creationOffre(this.offre).subscribe(  

    )
console.log( this.myform.value);
    

  }


}
