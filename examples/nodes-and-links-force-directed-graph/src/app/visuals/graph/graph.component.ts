import { Component, Input, ChangeDetectorRef, HostListener, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { D3Service, ForceDirectedGraph } from '../../d3';

@Component({
  selector: 'graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
            [draggableNode]="node" [draggableInGraph]="graph"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})

/**
 * This is the root component that will generate the graph and bind it to the document
 *
 * We want to be able to use this component like:
 *  <graph [nodes]="nodes" [links]="links"></graph>
 *
 * This component's job is to simply take the supplied nodes and links and create an instance of a ForceDirectedGraph
 */
export class GraphComponent implements OnInit, AfterViewInit {
  @Input('nodes') nodes;
  @Input('links') links;
  graph: ForceDirectedGraph;
  private _options: { width, height } = { width: 800, height: 600 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this.options);
  }


  /**
   * Notice how this shared graph component is consuming our D3 service and has a ref to a change detector
   * @param d3Service
   * @param ref
   */
  constructor(private d3Service: D3Service, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);

    /** Binding change detection check on each tick
     * This along with an onPush change detection strategy should enforce checking only when relevant!
     * This improves scripting computation duration in a couple of tests I've made, consistently.
     * Also, it makes sense to avoid unnecessary checks when we are dealing only with simulations data binding.
     */
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
