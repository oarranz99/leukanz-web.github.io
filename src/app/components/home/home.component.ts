import { Component, OnInit } from '@angular/core';
import { ViewChild,ElementRef,Renderer2} from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private renderer:Renderer2) { }

  @ViewChild('card') card!: ElementRef; 
  ngOnInit(): void {
  }
  onMouseMove(event:any) {
    let x = -(window.screen.width / 2 - event.screenX) / 10;
    let y = (window.screen.height / 2 - event.screenY) / 7;
    this.renderer.setStyle(this.card.nativeElement,'transform',`rotateY(${x}deg) rotateX(${y}deg)`);
  }

}
