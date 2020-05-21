var music,p=0;
if(document.getElementsByClassName("dark")[0]!=undefined)
{
    music=document.getElementsByClassName("dark")[0];
    $audio.src="./music/"+document.getElementsByClassName("dark")[0].id;
}
document.getElementById("uploadsong").onclick = ()=>{
    document.getElementById("song").click();
}
var submit = ()=>{
    document.getElementById("submitsong").click();
}
$('.fa-volume-down').click(()=>{
    if($audio.volume-0.1>=0)
        $audio.volume-=0.1;
});
$('.fa-volume-up').click(()=>{
    if($audio.volume+0.1<=1)
        $audio.volume+=0.1;
});
$('.fx-drop-in').click(()=>{
    if(music!=undefined)
    {
        if($('fx-drop-in').hasClass("fa-play"))
        {
            pause();
            p=0;
        }
        else
        {
            play(music);
        }
    }
});
var play = (elem)=>{
    if(p==1)
    {
       pause();
       $('.fx-drop-in').toggleClass("fa-play fa-pause");
    }
    if(music==undefined||music!=elem||p==0)
    {
        if(music!=elem||$seekbar.value==$seekbar.max)
        {
            music = elem;
            document.getElementById("sideimg").src=music.childNodes[1].childNodes[1].src;
            $audio.src="./music/"+music.id;
        } 
        $audio.play();    
        p=1;
        $('.fx-drop-in').toggleClass("fa-play fa-pause");
    }
    else
        p=0;
}
var pause = ()=>{
    $audio.pause();
}
var convert = (secs)=>{
    var h,m,s=secs,str="";
    m=parseInt(s/60);
    s=parseInt(s%60);
    h=parseInt(m/60);
    m=parseInt(m%60);
    s=(s<10)?"0"+s:s;
    m=(m<10)?"0"+m:m;
    h=(h<10)?"0"+h:h;
    document.getElementById("duration").getElementsByTagName("b")[0].innerHTML=h+":"+m+":"+s;
    document.getElementById("duration1").getElementsByTagName("b")[0].innerHTML=h+":"+m+":"+s;
}
$audio.onloadedmetadata = () => {
    $seekbar.max = $seekbar1.max = $audio.duration
    convert($audio.duration);
}
$seekbar.onchange = () => $audio.currentTime = $seekbar.value
$seekbar1.onchange = () => $audio.currentTime = $seekbar1.value
$audio.ontimeupdate = () => 
{
    $seekbar.value = $seekbar1.value = $audio.currentTime
    if($seekbar.value == $seekbar.max)
    {
        $('.fx-drop-in').toggleClass("fa-play fa-pause");    
        p=0;   
    }
}