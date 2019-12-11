import renderD3Tree from "./d3";

function renderWithRecursiveStack(element) {
  console.log("rendering " + element.name);

  element.children.forEach(child => {
    renderWithRecursiveStack(child);
  });
}

let nextUnitOfWork;

function renderWithInterruptibleFibers(element) {
  const rootFiber = {
    type: element.name
  };

  // jsx elements get converted to fibers during reconciliation
  convertToFiberDataStructure(rootFiber, element.children);

  nextUnitOfWork = rootFiber;
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  schedule(workLoop);
}

schedule(workLoop);

function schedule(fn) {
  // not what react uses internally, but good enough for demo:
  // codesandbox needs timeout for this to run in reasonable timeframe:
  // setting timeout high for gradual console logs to demonstrate interruptible rendering:
  requestIdleCallback(workLoop, { timeout: 200 });
}

function performUnitOfWork(fiber) {
  console.log(`rendering ${fiber.type}`);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;

  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function convertToFiberDataStructure(fiber, children) {
  let index = 0;
  let prevSibling = null;

  while (index < children.length) {
    const element = children[index];

    const newFiber = {
      type: element.name,
      parent: fiber
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;

    convertToFiberDataStructure(newFiber, element.children);
  }
}

const branches = 3;
const levels = 2;

function buildFakeElementTree() {
  return {
    name: "1",
    children: buildChildNodes()
  };
}

function buildChildNodes(level = 1, prefix = "1") {
  return [...Array(branches)].map((_, i) => {
    return {
      name: `${prefix}-${i + 1}`,
      children:
        level < levels ? buildChildNodes(level + 1, `${prefix}-${i + 1}`) : []
    };
  });
}

const tree = buildFakeElementTree();

console.log("render order with recursive stack:");
renderWithRecursiveStack(tree);
console.log("------------------------");
console.log("render order with interruptible fibers:");
renderWithInterruptibleFibers(tree);

renderD3Tree([tree]);
