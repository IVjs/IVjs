import assign from 'object-assign';

const definitions = () => {
  return {
    template: {
      id: getNewId(),
      tags: [],
      name: 'Sparky Pro Electrocutionator',
      type: 'TextOnly',
      image: 'some/image.jpg',
      duration: '0:23',
      plan: 'Expert',
      price: '$5'
    },
    templateGroup: {
      id: getNewId(),
      tags: [],
      name: 'Some Great Group Name',
      type: 'TextOnly',
      image: 'some/image.jpg',
      duration: '0:23',
      plan: 'Expert',
      price: '$5',
      children: []
    }
  }
};

let incrementor = 1;

function getNewId() {
  return incrementor++;
}

function getFaketory(faketory) {
  const defs = definitions();
  if (defs[faketory] === undefined) {
    throw new Error(`Test factory \`create('${faketory}')\` failed. There is no factory called "${faketory}"`);
  }
  return definitions()[faketory];
}

export function create(faketory, overrides) {
  let obj = getFaketory(faketory);
  overrides = overrides || {};
  return assign({}, obj, overrides);
}

export default create;