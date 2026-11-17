/* Note-by-note practice state machine, MIT licensed. */
(function(root){
  function createPractice(sequence, requiredFrames=3, beatMs=600, durations=[]){
    let index=0, streak=0, nextRepeatAt=null, complete=false;
    function resetAt(next){index=Math.max(0,Math.min(sequence.length-1,next));streak=0;nextRepeatAt=null;complete=false;}
    function listen(note, now=Date.now()){
      if(complete)return {index,complete};
      if(note!==sequence[index]){streak=0;return {index,complete,holding:nextRepeatAt!==null};}
      if(nextRepeatAt!==null){
        if(now<nextRepeatAt)return {index,complete,holding:true};
      } else if(++streak<requiredFrames) return {index,complete};
      const matched=sequence[index];streak=0;
      if(index===sequence.length-1){complete=true;nextRepeatAt=null;return {index,complete,advanced:true};}
      index++;
      nextRepeatAt=sequence[index]===matched?now+beatMs*(durations[index-1]||1):null;
      return {index,complete,advanced:true,holding:nextRepeatAt!==null};
    }
    function setTempo(bpm){if(Number.isFinite(bpm)&&bpm>=40&&bpm<=220){beatMs=60000/bpm;nextRepeatAt=null;streak=0;}}
    return {listen,resetAt,setTempo};
  }
  if(typeof module!=='undefined'&&module.exports)module.exports={createPractice};else root.FlutePractice={createPractice};
})(typeof window!=='undefined'?window:globalThis);
