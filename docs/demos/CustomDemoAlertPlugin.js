var alertFactory = (input) => {
  return {
    alert:(cmd) => {
      alert(cmd.value);
      return Promise.resolve({});
    },
  };
};


var alert = function(anything) {
  var command = {
  name: 'alert',
  value: anything,
};
this.pushCommands(command);
};

var alertPlugin = {
  apiExtension: { alert },
  targetFunctionFactories: [alertFactory],
};

