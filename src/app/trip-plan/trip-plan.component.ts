import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-trip-plan', templateUrl: './trip-plan.component.html', styleUrls: ['./trip-plan.component.css']
})
export class TripPlanComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;

  trips: Trip[] = [];
  private ctx: CanvasRenderingContext2D;

  constructor() {
     this.trips.push(new Trip('',''))
    // this.trips.push(new Trip("BLR", "MAA"))
    // this.trips.push(new Trip("MAA", "HYD"))
    // this.trips.push(new Trip("BLR", "HYD"))
    // this.trips.push(new Trip("HYB", "DEL"))
    // this.trips.push(new Trip("HYB", "DEL"))
    // this.trips.push(new Trip("DEL", "BLR"))
  }

  ngOnInit() {

  }

  add() {
    this.trips.push(new Trip("", ""))
  }

  remove(index) {
    this.trips.splice(index, 1)
  }

  submit() {

    //ctx.fillStyle = ;
    this.ctx.clearRect(0, 0, 1000, 200)
    let x = -50
    const l1y = 100
    const l2y = 10

    const edges: Edge[] = []

    for (let i = 0; i < this.trips.length - 1; i++) {
      const trip = this.trips[i]
      const trip2 = this.trips[i + 1]

      if (trip.end == trip2.end && trip.start == trip2.start) {
        console.log(trip.start + "-" + trip.end, "---L2---", trip2.start + "-" + trip2.end)
        if (i == 0) {
          edges.push(new Edge(trip.start + "-" + trip.end, "dash", 2))
        } else {
          edges[i].level = 2
        }

        edges.push(new Edge(trip2.start + "-" + trip2.end, "dash", 2))
      } else if (trip.end == trip2.start) {
        if (i == 0) {
          edges.push(new Edge(trip.start + "-" + trip.end, "dash", 1))
        }
        edges.push(new Edge(trip2.start + "-" + trip2.end, "dash", 1))
      } else {
        if (i == 0) {
          edges.push(new Edge(trip.start + "-" + trip.end, "Arrow", 1))
        }
        edges.push(new Edge(trip2.start + "-" + trip2.end, "Arrow", 1))
      }
    }
    this.ctx.beginPath()
    let fromX = x + 100
    let fromY = l1y

    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i]

      if (edge.level == 1) {
        this.ctx.fillText(edge.text, x += 100, l1y);
        
        if (i != 0) {

          if (edge.connector == "Arrow") {
            this.canvas_arrow(this.ctx, fromX, fromY, x, l1y);
          } else {
            this.canvas_dash(this.ctx, fromX, fromY, x, l1y);

          }
          fromX = x;
          fromY = l1y;
          this.ctx.strokeStyle ='#97a900';   
          this.ctx.stroke();
        }
      } else {
        this.ctx.fillText(edge.text, x += 100, l2y);
        if (i != 0) {
          this.canvas_dash(this.ctx, fromX, fromY, x, l2y);
          fromX = x;
          fromY = l2y;
          this.ctx.strokeStyle='#97a900'
          this.ctx.lineWidth = 2;

          this.ctx.stroke();
        }
      }
    }

  }

  canvas_dash(context, fromx, fromy, tox, toy) {
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox , toy);
    context.moveTo(tox, toy);
    context.lineTo(tox , toy );
  }

  canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.ctx.font = "Georgia";

  }
}

export class Edge {
  private readonly _text: string
  private readonly _connector: string


  constructor(text: string, connector: string, level: number) {
    this._text = text;
    this._connector = connector;
    this._level = level;
  }

  get connector(): string {
    return this._connector;
  }

  private _level: number

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get text(): string {
    return this._text;
  }
}

export class Trip {

  constructor(start: string, end: string) {
    this._start = start;
    this._end = end;
  }

  private _start: string | null = null;

  get start(): string | null {
    return this._start;
  }

  set start(value: string | null) {
    this._start = value;
  }

  private _end: string | null = null;

  get end(): string | null {
    return this._end;
  }

  set end(value: string | null) {
    this._end = value;
  }
}