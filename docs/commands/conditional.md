# Conditional clauses (if / else)

Conditional clauses allow you to execute a specific set of commands if certain condition is met, and execute different set of commands otherwise.


<br/>
# .if({condition})

`.if()` command evaluates a variable of your variable against a value of your choice.

If condition is validated, then the set of commands between `.if()` and `.endIf()` will be executed, otherwise these commands will be ignored.

For example:

```javascript

// the video will only play 
// if the value of the variable 'COUNT' is 5

myIV.node('first node')

    .if({var:'COUNT', is: 5})

        .playVideo('myvideo.mp4')
        .anotherCommand()
        .anotherCommand()

     .endIf()


```

# Evaluation Syntax

Typical syntax is:

```javascript

.if(var:'variable name', conditionName: string, number or array)

// following are the conditions that
//  can be used to evaluate the variables


// is: - variable matches the value exactly 

.if({var:'COUNT', is: 5})

.if({var:'NAME', is: 'Bob'})

// isLessThan:

.if({var:'COUNT', isLessThan: 5})

// isGreaterThan:

.if({var:'COUNT', isGreaterThan: 5})

// isBetween:

.if({var:'COUNT', isBetween: [10,20]})

// isGreaterThanOrEqualTo:

.if({var:'COUNT', isGreaterThanOrEqualTo: 5})

// isLessThanOrEqualTo:

.if({var:'COUNT', isLessThanOrEqualTo: 5})

```


# Multiple .if() Statements

multiple if statements within the 'if() / endIf()' scope can evaluate multiple conditions and supply appropriate commands.  The subsequent if() after the first one are treated like 'elseIf' clauses.


```javascript

// in the example below, multiple statements will
// be evaluated based on the current value of the
// COUNT variable

myIV.node('first node')
    .if({var:'COUNT', is: 5})

        .playVideo('myvideo.mp4')
        .anotherCommand()
        .anotherCommand()

    .if({var:'COUNT', isLessThan: 5})

        .playVideo('myvideo1.mp4')
        .anotherCommand()

    .if({var:'COUNT', isGreaterThan: 5})

        .playVideo('myvideo2.mp4')
        .anotherCommand()
        .anotherCommand() 

    .if({var:'COUNT', isBetween:[10,20]})

        .playVideo('myvideo3.mp4')       

    .endIf()


```

<br>

# .else()

.else() clause allows you to create a Default set of commands that will be executed if none of the conditions are met.

For example:

```javascript

// If 'COUNT' is more than 5, then .else() commands 
// will be executed 

myIV.node('first node')
    .if({var:'COUNT', is: 5})

        .playVideo('myvideo.mp4')
        .anotherCommand()
        .anotherCommand() 

    .if({var:'COUNT', isLessThan: 5})

        .playVideo('myvideo1.mp4')  

    .else()

        .playVideo('myvideo2.mp4') 
        .anotherCommand()

    .endIf() 


```

<br>

# .endIf()

.endIf() will terminate the .if() clause.  Any commands after endIf() will be executed unconditionally.




