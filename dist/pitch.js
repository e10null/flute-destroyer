/* Flute Destroyer pitch estimator. MIT licensed; see LICENSE. */
(function(root){
  function detectPitch(input, sampleRate) {
    const size=input.length, minHz=240, maxHz=2200;
    let mean=0; for(let i=0;i<size;i++) mean+=input[i]; mean/=size;
    let power=0; for(let i=0;i<size;i++){const v=input[i]-mean;power+=v*v;}
    const rms=Math.sqrt(power/size); if(rms<0.003) return null;
    const minTau=Math.floor(sampleRate/maxHz), maxTau=Math.min(Math.floor(sampleRate/minHz), Math.floor(size/2)-1);
    const diff=new Float64Array(maxTau+2), cmnd=new Float64Array(maxTau+2); cmnd[0]=1;
    // A fixed comparison window keeps the difference function unbiased at longer lags.
    const windowSize=Math.floor(size/2);
    for(let tau=1;tau<=maxTau+1;tau++){let sum=0;for(let i=0;i<windowSize;i++){const d=input[i]-input[i+tau];sum+=d*d;}diff[tau]=sum;}
    let running=0;for(let tau=1;tau<=maxTau+1;tau++){running+=diff[tau];cmnd[tau]=running?diff[tau]*tau/running:1;}
    let tau=0;for(let t=minTau;t<=maxTau;t++){if(cmnd[t]<0.2){while(t<maxTau&&cmnd[t+1]<cmnd[t])t++;tau=t;break;}}
    if(!tau || cmnd[tau]>0.2) return null;
    const a=cmnd[tau-1],b=cmnd[tau],c=cmnd[tau+1],denom=a-2*b+c;
    const refined=tau+(denom?0.5*(a-c)/denom:0); const frequency=sampleRate/refined;
    if(!Number.isFinite(frequency)||frequency<minHz||frequency>maxHz) return null;
    return {frequency,confidence:1-cmnd[tau],rms};
  }
  function describePitch(frequency, a4=440){const midi=Math.round(69+12*Math.log2(frequency/a4));const target=a4*Math.pow(2,(midi-69)/12);return {midi,name:['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'][((midi%12)+12)%12],octave:Math.floor(midi/12)-1,cents:1200*Math.log2(frequency/target)};}
  const api={detectPitch,describePitch}; if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.FluteDestroyerPitch=api;
})(typeof window!=='undefined'?window:globalThis);
