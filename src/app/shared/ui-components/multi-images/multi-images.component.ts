import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bw-multi-images',
  templateUrl: './multi-images.component.html',
  styleUrls: ['./multi-images.component.scss']
})
export class MultiImagesComponent implements OnInit {
  image = null;
  images = [
    "https://gloimg.gamcdn.com/G/pdm-product-pic/Clothing/2016/10/15/source-img/20161015092246_60853.jpg",
    "https://s-media-cache-ak0.pinimg.com/736x/de/7b/34/de7b341cd06f72f696076d19d4d504d1--blue-homecoming-dresses-grad-dresses.jpg"
  ];

  constructor() { }

  ngOnInit() {
  }

  removeImage(imgIndex) {
    this.images.splice(imgIndex,1);
  }

  addImage(img){
    this.images.push(img);
    this.image = null;
  }

}
