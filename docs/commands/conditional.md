# Conditional clauses (if / else)

Conditional clauses allow you to execute a specific set of commands if certain condition is met, and execute different set of commands otherwise.


<br/>
# .if({condition})

`.if()` command evaluates a variable of your choice against the value of your choice, using the operator of your choice.

If condition is validated, then the set of commands between `.if()` and `.endIf()` will be executed, otherwise these commands will be ignored.

For example:

```javascript

// you can use .playVideo() command to play a single file

myIV.node('first node')
    .if({var:'COUNT', is: 5)
        .playVideo()

```

<br>

# .else()

It's a multi-functional command that can take a single string, an array of strings, or an array of parameter objects or strings and play these sequentially.

For example:

```javascript

// you can use .playVideo() command to play a single file

myIV.node('first node')
    .playVideo('filename.mp4')

```

<br>

# .endIf()

It's a multi-functional command that can take a single string, an array of strings, or an array of parameter objects or strings and play these sequentially.

For example:

```javascript

// you can use .playVideo() command to play a single file

myIV.node('first node')
    .playVideo('filename.mp4')

```

<br>

