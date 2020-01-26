// The main thing here is to create a matrix that has the keyboard as an
// implicitly defined graph.  We'll create a lookup table to save time as we go
module.exports.createKeyboard = function (alphabet, rowLength) {
  let map = {};
  let graph = [];
  let row = [];
  let x = 0;
  let y = 0;

  for (let i = 0; i < alphabet.length; i++) {

    // Wrap around to a new row when needed
    if (i !== 0 && i % rowLength === 0) {
      x = 0;
      y++;
      graph.push(row);
      row = [];
    }

    // Add the letter to the map with x,y coordinates
    map[alphabet[i]] = [x, y];
    // add the letter to the graph
    row.push(alphabet[i]);
    x++;
  }

  // Don't forget the last row
  graph.push(row);

  // Return the map and the graph we've constructed
  return { map, graph };
}

// Calculate the shortest path on the keyboard to spell the word using the
// starting focus
module.exports.shortestPathOnKeyboard = function (keyboard, startingFocus, word) {
  let distance = 0;
  let path = [];
  let letters = word.split("");
  let start = startingFocus;

  letters.forEach(letter => {
    const target = breadthFirstSearch(start, letter, keyboard);
    start = letter;

    // Trace back from the end to the start
    let node = target;
    let newPath = [];
    while (node.parent) {
      // have to use unshift instead of push in order to construct the path in
      // the right order.  Because we're staging from the last node, we have to
      // build it in reverse order.
      newPath.unshift(node.path);
      node = node.parent;
      // We can just keep track of the number of hops from node to node since
      // this graph is unweighted
      distance++;
    }

    // Append the path to the node to the overall path
    path = path.concat(newPath);
    // Don't forget to push the key after navigation
    path.push("p");
  });

  return { distance, path };
}

// Since the keyboard is an unweighted, undirected graph, this is based on BFS
// using the keyboard matrix as an implicitly defined graph
breadthFirstSearch = function (start, end, keyboard) {
  // we can use a regular javascript array as a queue thanks to the push and
  // shift functions
  const queue = [];

  // use an object as a lookup table for discovered nodes
  const discovered = {};
  const { map, graph } = keyboard;

  // construct the starting node.  For the purposes of this exercise a regular
  // javascript object will suffice.  Classes would be useful in a bigger solution
  const startNode = {
    value: start,
    parent: null,
    path: null
  }

  // mark the first node as discovered
  discovered[start] = true;

  // add the first node to the queue
  queue.push(startNode);

  // keep going until the queue is empty
  while (queue.length > 0) {

    // grab the first node in the queue
    const currentNode = queue.shift();

    // if it's the one we're looking for then return
    if (currentNode.value === end) {
      return currentNode;
    }

    // retrive the location of the current node from the lookup table
    const location = map[currentNode.value];

    // This is the origin
    const x = location[0];
    const y = location[1];

    // calculate all possible neighbours
    const neighbours = [
      [x, y - 1, "u"],
      [x, y + 1, "d"],
      [x - 1, y, "l"],
      [x + 1, y, "r"]
    ];

    // calculate the number of rows and columns to wrap around the cursor
    let numCols = graph[y].length;
    let numRows = graph.length;

    // Since the keyboard is left aligned, we may need to adjust numRows
    while (!graph[numRows - 1] || !graph[numRows - 1][x]) {
      numRows -= 1;
    }

    // now try to visit each neighbour
    neighbours.forEach(neighbour => {
      let x1 = neighbour[0];
      let y1 = neighbour[1];

      // wrap around if needed
      if (y1 < 0) {
        y1 += numRows;
      } else {
        // we can safely use the modulo operator here because it will just return
        // the original value of y1
        y1 %= numRows;
      }

      // wrap around if needed
      if (x1 < 0) {
        x1 += numCols;
      } else {
        x1 %= numCols;
      }

      // construct a new node object
      const node = {
        value: graph[y1][x1],
        parent: currentNode,
        path: neighbour[2]
      };

      // only add undiscovered nodes to the queue
      if (!discovered[node.value]) {
        // don't forget to mark the node as discovered
        discovered[node.value] = true;
        queue.push(node);
      }
    });
  }
};
