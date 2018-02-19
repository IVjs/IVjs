var myIV = new IV();

// Settings section

myIV.settings = {
    baseVideoUrl: 'https://s3.amazonaws.com/ivxml.chapel/interactivation/santatad/MP4/',
    bgAudioUrl: 'http://www.orangefreesounds.com/wp-content/uploads/2017/12/We-wish-you-a-merry-christmas.mp3'
}

// Variables here


myIV.variables = {
    video: 'santalikes',
    hated: [
        'candles',
        'chocolate',
        'bells',
    ],
    loved: [
        'strippers',
        'tanks',
        'toast',
    ],
    keepGoing: [
        'letskeepdoing',
        'playingtogether',
    ]
}

// First Node Comment Here
// You can describe what it does

myIV.defineNode('First Node')
    .videoPlay({ url: 'timenow.mp4', onComplete: 'Second Node' })
    .bgAudio('pause')

myIV.defineNode('Second Node')
    .videoPlay([
        'ihate.mp4',
        '{{hated | random}}.mp4',
        'ilove.mp4',
        '{{loved | random}}.mp4',
        {url: '{{keepGoing | random}}.mp4', onComplete: 'Second Node'}])
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
