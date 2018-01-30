import {IV} from './IV-js'
// Settings section

IV.settings = {
    baseVideoUrl: 'https://s3.amazonaws.com/ivxml.chapel/interactivation/santatad/MP4/'
}

// Variables here


IV.variables = {
    count: 0,
    userName: 'Andrey'
}

// First Node Comment Here
// You can describe what it does

    IV.defineNode('First Node')
        .playVideo('letskeepdoing.mp4')
        .nextNode('Second Node')
        .addNode();

// Second Node Comment Here
// You can describe what it does

    IV.defineNode('Second Node')
        .playVideo('officeparties.mp4')
        .addButton({ text: 'First Choice', class: 'red bottom center', onClick: 'Third Node'})
        .addButton({ text: 'Second Choice', class: 'red bottom center', onClick: 'Fourth Node' })
        .addNode();


// Second Node Comment Here
// You can describe what it does

    IV.defineNode('Third Node')
        .if({var:'count', greaterThan: 5})
            .playVideo('http://test.mp4')
            .nextNode('thirdNode')
        .if('count == 12')
            .playVideo('http://test1.mp4')
            .nextNode('thirdNode1')
        .else()
            .playVideo('http://test2.mp4')
            .nextNode('thirdNode2')
        .endIf()
        .playVideo('timenow.mp4')
        .nextNode('First Node')
        .addNode();

    // End Second node

    IV.defineNode('Fourth Node')
        .playVideo('santalikes.mp4')
        .nextNode('First Node')
        .addNode();


        console.log(IV.nodes);

        IV.run('First Node');



