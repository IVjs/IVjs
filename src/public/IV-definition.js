var myIV = new IV();

// Settings section

myIV.settings = {
    baseVideoUrl: 'https://s3.amazonaws.com/ivxml.chapel/interactivation/santatad/MP4/'
}

// Variables here


myIV.variables = {
    count: 0,
    userName: 'Andrey'
}

// First Node Comment Here
// You can describe what it does

myIV.defineNode('First Node')
    .videoPlay({ url: 'timenow.mp4', onComplete: 'Second Node' })
    .bgAudio({ load: 'http://www.orangefreesounds.com/wp-content/uploads/2017/12/We-wish-you-a-merry-christmas.mp3'})
    .bgAudio('pause')

myIV.defineNode('Second Node')
    .videoPlay(['santalikes.mp4', {url: 'letskeepdoing.mp4', onComplete: 'First Node'}])
    .bgAudio('play')

    // .nextNode('Second Node');
        

// // Second Node Comment Here
// // You can describe what it does

// myIV.defineNode('Second Node')
//     .playVideo('officeparties.mp4')
//     .addButton({ text: 'First Choice', class: 'red bottom center', onClick: 'Third Node'})
//     .addButton({ text: 'Second Choice', class: 'red bottom center', onClick: 'Fourth Node' });
        


// // Third Node Comment Here
// // You can describe what it does

// myIV.defineNode('Third Node')
//     .if({var:'count', greaterThan: 5})
//         .playVideo('http://test.mp4')
//         .nextNode('thirdNode')
//     .if('count == 12')
//         .playVideo('http://test1.mp4')
//         .nextNode('thirdNode1')
//     .else()
//         .playVideo('http://test2.mp4')
//         .nextNode('thirdNode2')
//     .endIf()
//     .playVideo('timenow.mp4')
//     .nextNode('First Node');
        

// // End Third node

// myIV.defineNode('Fourth Node')
//     .playVideo('santalikes.mp4')
//     .nextNode('First Node');
    


// console.log(myIV.nodes);

myIV.run('First Node');
