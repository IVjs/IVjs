defineNode()
  .if({ var: 'count', is: 5 })
    .playVideo('some-video.mp4')
  .if({ var: 'count', lessThan: 5 })
    .playVideo('some-video.mp4')
  .else()
    .playVideo('higher-than-five.mp4')
  .endIf()


  function ifMakerBase(previousResult, ifStatement) {
    if (previousResult) return previousResult;
    return ifStatement()
  }

  function ifStatement(operatorName, variable, callback) {
    sw
  }

  commands = [
    (previous) => { if (this.variables['count'] === 5) return ( () => this.useVideoObject(3) )}
    (previous) => { if }
  ]

  function run() {
    commands.reduce((lastReturn, cmd) => cmd(lastReturn), null);
  }

  // There must be a smart command runner that can play and pause execution as needed

  const x = {
    type: 'cmd',
    name: 'if',
    args: [
      {type: 'literal', value: 2 },
      {type: 'cmd', name: 'max', args:[ {} ]}
    ]
  }


////////////////////////////////////////////////

.tif({var: 'count', is: 5})
  .playVideo('somevid.mp4')
.endIf()

function tif(settings) {
  this.newCondition()

  const {var: varName} = settings;
  let operator;
  for (const propName in settings) {
    if (propName === 'var') continue;
    operator = propName;
  }

  this.registerDo({varName, operator, value: settings[operator]})
}

function registerDo({varName, operator, value}) {
  const doObj = {varName}
  doObj[operator] = value;
  this.currentDo.push(doObj);
}

node.registerCommand() // this places commands based on if we are doing a conditional
  
  
makeSwitch({varName, operator})

function makeSwitch()

// {
//   commands: [
//     {
//       name: 'switch',
//       do: [{
//         varName: 'count',
//         is: 5,
//         commands: [{}, {}, {}]
//       }, {
//         varName: 'count',
//         greaterThan: 5,
//         commands: [{}, {}, {}]
//       }, {
//         varName: 'count',
//         lessThan: 3,
//         commands: [{}, {}, {}]
//       }],
//       defaultCommands: [{}, {}, {}],
//     },
//   ]
// }

{
  commands: [
    {
      name: 'switch',
      do: [{
        varName: 'count',
        is: 5,
        commands: [{playvidobj}]
      }],
      defaultCommands: [],
    },
    {playvidobj}
  ]
}