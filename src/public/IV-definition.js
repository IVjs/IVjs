var myIV = new IV();

// adjust Settings

myIV.settings = {
    baseVideoUrl: 'https://s3.amazonaws.com/ivxml.chapel/interactivation/santatad/MP4/',
    bgAudioUrl: 'http://www.orangefreesounds.com/wp-content/uploads/2017/12/We-wish-you-a-merry-christmas.mp3'
}


// Define Variables

myIV.variables = {
    iHate: 'ihate',
    iLove: 'ilove',
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
        'santalikes',
    ]
}

// Define Nodes

// First node: Intro
// Plays the timenow video then goes to Second Node

myIV.node('Intro')
    .videoPlay({ url: 'timenow.mp4', onComplete: 'Love and Hate' })
    .log()



// Second Node: Love and Hate
// starts the background music
// plays ihate, then a random hated thing
// plays ilove, then a random loved thing
// plays one of the "keep going" videos
// calls the Keep Going node

myIV.node('Love and Hate')
    .bgAudio('play')
    .videoPlay( [
        '{{iHate}}.mp4', '{{hated | random}}.mp4',
        '{{iLove}}.mp4', {url: '{{loved | random}}.mp4', onComplete: 'Keep Going'},
    ] )



// Third Node: Keep Going
// plays a random "keep going" video

myIV.node('Keep Going')
    .videoPlay({ url: '{{keepGoing | random}}.mp4', onComplete: 'Love and Hate' })



// Run the application

myIV.run('First Node');
