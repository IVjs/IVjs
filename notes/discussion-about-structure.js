defineNode()
  .if({ var: 'count', is: 5 })
    .playVideo('some-video.mp4')
  .if({ var: 'count', lessThan: 5 })
    .playVideo('some-video.mp4')
  .else()
    .playVideo('higher-than-five.mp4')
    .execute('anyNode')
  .endIf()
  .goto('otherNode')

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

  .playVideo({onDone: })
  .whatever()
  .onvideoDone('nodeName')

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

states: 'ready', 'running', 'waiting', 'done'

{
  nodeKey: 'nameOfNode'
  defaultGoto:
  commands: [
    {
      name: 'target',
      keyName: 'anything'
    },
    {
      name: 'switch',
      do: [{
        varName: 'count',
        is: 5,
        commands: [{}, {}, {}]
      }, {
        varName: 'count',
        greaterThan: 5,
        commands: [{}, {}, {}]
      }, {
        varName: 'count',
        lessThan: 3,
        commands: [{}, {}, {}]
      }],
      defaultCommands: [{}, {}, {}],
    },
    {
      name: 'playVideo',
      file: '{{url-to-file}}.mp4', // just an example, but all will be possible
      loop: boolean | null | number,
      onComplete: [{}]
    },
    {
      name: 'stopExecution'  // implicit "done"
    },
    {
      name: 'pauseExecution' // implicit "waiting"
    },
    {
      name: 'goToNode',  // implicit done
      nodeName: 'nodeName'
    },
    {
      name: 'executeAsync',
      nodeName: 'someNode'
    },
    {
      name: 'wait',
      time: number // milliseconds
    },
    {
      name: 'timeout',
      time: number, // milliseconds
      commands: [{}]
    },
    {
      name: 'executeSync',
      nodeName: 'someNode'
    },
    {
      name: 'goToCommand',  // (inside this node)
      nodeName: string | null,
      target: null | string // 'anything'
    },
    {
      name: 'assignVariable',
      assignTo: 'variableName',
      value: string | number | string[] | number[],
    },
    {
      name: 'calculate',
      varName: 'any',
      operation: 'add' | 'subtract' | 'multiply' | 'divide',
      assignTo: 'variableName'
    },
    {
      name: 'getRandomNumber',
      min: number, // inclusive
      max: number,
      assignTo: 'variableName'
    },

  ]
}



myIV.node('Love and Hate')
  .calculate({ var: 'nodeCount', storeIn: 'nodeCount', add: 1 })
  .playVideo(
    '{{iHate}}.mp4', '{{hated | random}}.mp4',
    {
      goTo: 'Keep Going',  //
      runSync: '',         //
      runAsync: '',        //   runs on end
      js: someFunc,        //
      timestamps: [{
        time: 12,        //
        goTo:            //
          runSync:         //   runs at time
        runAsync:        //
          js:              //

      }]
    },
    '{{iLove}}.mp4', '{{loved | random}}.mp4',
)
  .

  someFunction(variables)
{
  if (var)
    myIV.run('somenode')
}


    .addMessage
  .clearMessages
  .clearAllMessages

  .show
  .hide
  .showForm
  .hideForm

  .addButton({
    id: '',
    goTo: 'Keep Going',
    runSync: '',
    runAsync: '',
    text: '',
    remove: true,
    // class: '',
    js: someFunc,

  })

  .removeAllButtons()
  .removeButton('', ...)

  .addToggle({
    id: 'aToggle',
    textOn: 'checked text',
    textOff: 'unchecked text',
    text: 'constant text',
    onValue: 'good santa',
    offValue: 'bad santa',
    // defaultState: 'off',
    storeIn: 'santaType',
    js: someFunc
  })
