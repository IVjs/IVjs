# Branch Execution Commands

IVjs allows you to create groups of commands, which are encapsulated into IV nodes, and sequentially execute these groups of commands by "jumping" from one node to another, or calling certain nodes as asynchronous or synchronous subroutines. 


## .goToNode('node name')

This command is fairly streighforward.  It will stop the flow of the execution of the current node, and will jump to execution of the named node.  It typically should reside as the last command in the node, or a jump that occurs within a conditional statement.

For example:

```javascript

// a very simple IV command progression scenario would be

myIV.node('first node')
    .doSomething()
    .doSomethingElse()
    .goToNode('second node')


myIV.node('second node')
    .doSomething()
    .doSomethingElse()
    .goToNode('third node')
 
 
myIV.node('third node')
    .doSomething()
    .doSomethingElse()
    .goToNode('first node')

```

We can very easily define conditional statements that would create branched execution

```javascript    
myIV.node('first node')
    .doSomething()
    .doSomethingElse()
    .if({var: 'COUNT', is: 5}
        .goToNode('second node')
    .else()
        .goToNode('third node')


myIV.node('second node')
    .doSomething()
    .doSomethingElse()
    .goToNode('third node')
 
 
myIV.node('third node')
    .doSomething()
    .doSomethingElse()
    .goToNode('first node')
```



## .executeSync()

This branched execution command will go to the named node and will wait until that node is done executing. The execusion will then proceed executing the node from which it was called.

For example:

```javascript

// in this example we will execute some commands
// on the main node (1)

myIV.node('main node')
    .doSomething()
    .doSomethingElse()

// we will then jump to subroutine and wait
// until it's done (2)  

    .executeSync('subroutine node') 

// Execution of the 'main node' will then continue(4)  

    .continueToDoSomething()
    .continueToDoSomethingElse()
 


myIV.node('subroutine node')
    .doSomething()
    .doSomethingElse()
    .finalCommand() 
// subroutine is done (3)    


```


## .executeAsync()

This command will execute a subroutine node and proceed with execution of the current node without waiting.  The node will be executed "in the background" of the current node execusion running.

For example:

```javascript

// in this example we will execute some commands
// on the main node (1)

myIV.node('main node')
    .doSomething()
    .doSomethingElse()

    .executeAsync('subroutine node') 

    .continueToDoSomething()
    .continueToDoSomethingElse()
 


myIV.node('subroutine node')
    .doSomething()
    .doSomethingElse()
    .finalCommand() 
  


```

# Event-Driven Execution

Progression of the node execution can be triggered by various events, such as completion of video playback, or button clicks.

For example:

```javascript

// in this example we will execute some commands
// on the main node (1)

myIV.node('main node')
    .playVideo({url:'fileName.mp4' , onComplete:'second node'})
 

myIV.node('second node')
    .doSomething()
    .doSomethingElse()
    .finalCommand() 
    .goToNode('main node')
  

```
