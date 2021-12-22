const musicContainer=document.querySelector('.music-container')
const prevBtn=document.querySelector('#prev')
const playBtn=document.querySelector('#play')
const nextBtn= document.querySelector('#next')
const progressContainer=document.querySelector('.progress-container')
const progress=document.querySelector('.progress')
const title=document.querySelector('#title')
const cover=document.querySelector('#cover')
const audio= document.querySelector('#audio')

const songs=['hey', 'summer', 'ukulele']
let songIndex=2
loadSong(songs[songIndex])
function loadSong (song){
    title.innerHTML=`${song}`
    audio.src=`music/${song}.mp3`
    cover.src=`pictures/${song}.jpg`

}
function updateProgress(e){
 const {duration, currentTime}=e.srcElement
 const percentage=(currentTime/duration)*100
 progress.style.width=`${percentage}%`
}

function setProgress(e) {
    const clickX=e.offsetX
    const width=this.clientWidth
    const duration=audio.duration
    audio.currentTime=(clickX/width)*duration
    
  }
function playSong(){
     
 musicContainer.classList.add('play')
 playBtn.querySelector('i.fas').classList.remove('fa-play')
 playBtn.querySelector('i.fas').classList.add('fa-pause')
  audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
 playBtn.querySelector('i.fas').classList.add('fa-play')
  
  audio.pause()

}
playBtn.addEventListener('click', ()=>{
    const isPlaying=musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})

prevBtn.addEventListener('click',  playNextSong)

 function playNextSong() {
    songIndex--
    
    if(songIndex<0){
        songIndex=songs.length-1
    }
    loadSong(songs[songIndex])
    playSong(songs[songIndex])
}

nextBtn.addEventListener('click', ()=>{
     songIndex++
    if(songIndex>songs.length-1){
     songIndex=0
    }
   
    loadSong(songs[songIndex])
    playSong(songs[songIndex])
    

})
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', playNextSong)