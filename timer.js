class Timer{
    constructor(durationinput,start,stop,callbacks){
  this.durationinput=durationinput;
  this.start=start;
  this.stop=stop
  if(callbacks){
    this.onstart=callbacks.onstart,
    this.ontick=callbacks.ontick,
    this.oncomplete=callbacks.oncomplete
  }
//   this.startfunc = this.startfunc.bind(this);
  this.start.addEventListener('click',this.startfunc)
  this.stop.addEventListener('click',this.pause)
}
    startfunc=()=>{
        if(this.onstart){
            this.onstart(this.timeremaining)
        }
        this.tick()
      this.Intervalid= setInterval(this.tick, 10); //here this represent the timer
    }
    pause=()=>{
        clearInterval(this.Intervalid)
    }
    tick=()=>{
        if(this.timeremaining<=0){
            this.pause()
            if(this.oncomplete){
                this.oncomplete()
            }
        }else{
        this.timeremaining=this.timeremaining-0.01;
        if(this.ontick){
            this.ontick(this.timeremaining)
        }
        }
    }
    get timeremaining(){
        return parseFloat(this.durationinput.value)
    }
    set timeremaining(time){    
        return this.durationinput.value=time.toFixed(2)
    }
}
const durationinp=document.querySelector('.durationinput')
const startbtn=document.querySelector('.start')
const pausebtn=document.querySelector('.stop')
const circle=document.querySelector('circle');
const perimeter=circle.getAttribute('r')*2*Math.PI
 circle.setAttribute("stroke-dasharray",perimeter)

let duration;
const timer=new Timer(durationinp,startbtn,pausebtn,{
    onstart(totalduration){
   duration=totalduration
    },
    ontick(timeremaining){
       circle.setAttribute("stroke-dashoffset",
     perimeter*timeremaining/duration-perimeter
       )
    },
    oncomplete(){
        console.log("now its complete")
    }
})