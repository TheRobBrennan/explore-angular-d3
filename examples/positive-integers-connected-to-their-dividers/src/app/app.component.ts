import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node, Link } from './d3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    /**
     * Here is where the magic is. Let's say we have N defined as 3.
     *
     * Our processing loop would look something like:
     *
     * 1
     *  1 * 2 <= 3 :: Increment link count on the node containing 1 and the node containing 2 and create a Link
     *  1 * 3 <= 3 :: Increment link count on the node containing 1 and the node containing 3 and create a Link
     *
     * 2
     *  2 * 2 > 3 therefore we will not increment link counts or create a link
     *
     * 3
     *  3 * 2 > 3 therefore we will not increment link counts or create a link
     *
     * So, what happens if we have N defined as 6? Following the same processing loop above, we see that
     * the number 2 is connected to 1, 4, and 6.
     */
    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }
}
