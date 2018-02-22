# Typical IV-Node Structure

IVjs node is a collection of commands that will be executed sequentially in the order  these were defined.

These commands are chained together using the popular JS method-chaining convention.  Each node is defined with a `Node Name`, which serves as a reference point for execution of that node.

You can begin defining the node by using a .node() function of your IV instance.

```javascript

myIV.node('Node Name')

```

You can then subsequently begin chaning the commands by using recommended .command() per each command/line syntax as such:

```javascript

myIV.node('Node Name')
    .command1('options')
    .command2('options')
    .command3('options')

```
Although, for shorter node chains, you may consider using a single-line chain:

```javascript

myIV.node('Node Name').command1('options').command2('options')

```

You may place line-breaks for readability, or add comments between node command chain.

```javascript

myIV.node('Node Name')

    .command1('options')

// I'd like to note something important here

    .command2('options')

    .command3('options')

```

<br/>

!> Important Considerations

<br/>
# Breaking the Chain

Any subsequent command that doesn't begin with .command() syntax will break the chain of commands, which typically would signify a new node or a global IV command.

```javascript

myIV.node('First Node')
    .command1('options')
    .command2('options')

// ending the chain of commands for the first node

myIV.node('Second Node')
    .command1('options')
    .command2('options')
    .command3('options')

// ending the chain of commands for the second node

myIV.run()

```