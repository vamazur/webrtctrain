const { peerjs: {Peer}} = require("peerjs")

const myVideoElement = document.getElementById('my');
const remoteVideoElement = document.getElementById('remote')

const constraints = window.constraints = {
  audio: true,
  video: true
};

const peer = new Peer("binariksdemowithwebrtc3000");
console.log('destroyed')
peer.on('open', (id) => {
  console.log('My peer ID is: ' + id);
});

  navigator.mediaDevices.getUserMedia(constraints).then(function(myStream) {
    const call = peer.call('binariksdemowithwebrtc3000', myStream);
    
    call.on(
      'stream', function(remoteStream) {
        console.log(peer, call, myStream)
        remoteVideoElement.srcObject = remoteStream;
      });
    })
peer.on('error', (err) => console.log(err, 'ERR'))
const startCall = () => {
}
window.startCall = startCall;
console.log(peer, 'PEER')

  peer.on('call', (call) =>  {
    console.log(peer,call, 'setItemPEER')
    console.log('hereitis', remoteVideoElement)
    navigator.mediaDevices.getUserMedia(constraints).then(function(myStream) {
      call.answer(myStream);
      call.on(
        'stream', function(remoteStream) {
          remoteVideoElement.srcObject = remoteStream;
        });
      })
    })

const answerCall = () => {

}
window.answerCall = answerCall;

const path = './recordings/saved.mp4'
navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
const recorder = new MediaRecorder(stream);
recorder.start(1000)
const blob_reader = new FileReader();
// window.stream = stream;
myVideoElement.srcObject = stream;
const storage_stream = require("fs").createWriteStream(path);
const blobs = [];
blob_reader.addEventListener("load", function(ev) {
    storage_stream.write(Buffer.from(ev.currentTarget.result));
    if(blobs.length) {
        ev.currentTarget.readAsArrayBuffer(blobs.shift());
    }
});
recorder.addEventListener("dataavailable", function(ev) {
    if(blob_reader.readyState != 1) {
        blob_reader.readAsArrayBuffer(ev.data);
    } else {
        blobs.push(ev.data);
    }
    });
  });