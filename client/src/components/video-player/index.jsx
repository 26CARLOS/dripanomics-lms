import { useRef,useState, useEffect} from "react";
import ReactPlayer from "react-player";
import { Slider } from "../ui/slider";
import {Play, Pause, RotateCcw, RotateCw} from "lucide-react";
import { Button } from "../ui/button";
import {Volume2, VolumeX, Minimize, Maximize} from "lucide-react"


function VideoPlayer({
    width='100%', 
    height='100%',
    url,
    onProgressUpdate,
    progressData,
    }) {

    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [muted, setMuted] = useState(false);
    const [played, setPlayed] = useState(0);
    const [seeking, setSeeking] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const playerRef = useRef(null);
    const playerContainer = useRef(null);
    const controlsTimeoutRef = useRef(null);

    function handlePlayPause (){
        setPlaying(!playing);
    }

    function handleProgress(state){
        if(!seeking){
            setPlayed(state.played)
        }
    }

    function handleRewind(){
        playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 5)
    }

    function handleForward(){
        playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 5)

    }

    function handleToggleMute() {
        setMuted(prevMuted => {
            if (prevMuted) {
                setVolume(0.5);
            } else {
                setVolume(0);
            }
            return !prevMuted;
        });
    }

    function handleSeekChange(newValue){
        setPlayed(newValue[0]);
        setSeeking(true)

    }

    function handleSeekMouseUp(){
        setSeeking(false)
        playerRef?.current?.seekTo(played)

    }

    function handleVolumeChange(value){
        setVolume(value[0])
    }

    function pad(string){
        return ("0"+string).slice(-2)
    }

    function formatTime(seconds) {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds(); // Fixed typo from getUTCSeeconds to getUTCSeconds

        if (hh) {
            return `${hh}:${pad(mm)}:${pad(ss)}`; // Fixed template literal syntax
        }

        return `${pad(mm)}:${pad(ss)}`; // Added padding for minutes and seconds
    }

    function handleToggleFullScreen(){
        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (playerContainer.current.requestFullscreen) {
                playerContainer.current.requestFullscreen();
            } else if (playerContainer.current.webkitRequestFullscreen) {
                playerContainer.current.webkitRequestFullscreen();
            } else if (playerContainer.current.msRequestFullscreen) {
                playerContainer.current.msRequestFullscreen();
            }
            setIsFullScreen(true);
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullScreen(false);
        }
    }

    function handleMouseMove(){
            setShowControls(true)
            clearTimeout(controlsTimeoutRef.current)
            controlsTimeoutRef.current = setTimeout(()=>setShowControls(false), 3000)
        }
    
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };
    
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (played === 1) {
          onProgressUpdate({
            ...progressData,
            progressValue: played,
          });
        }
      }, [played]);

    

    return ( 
    <div ref={playerContainer}
    className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl transition-all duration-300 ease-in-out 
    ${isFullScreen ? 'w-screen h-screen z-50' : ''}
    `}
    style={{width, height}}
    onMouseMove={handleMouseMove}
    onMouseLeave={()=>setShowControls(false)}
    >
        <ReactPlayer
        ref={playerRef}
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        url={url}
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        config={{
            file: {
                attributes: {
                    onContextMenu: e => e.preventDefault(), // Disable right-click
                    disablePictureInPicture: true, // Disable picture-in-picture
                    playsInline: true // Force inline playback
                },
            },
        }}
        />
        {
            showControls && (
                <div className={`absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-4 transition-opacity duration-300 ${ 
                    showControls ? 'opacity-100':'opacity-0'
                    }` }
                    >  
                        <Slider
                        value={[played * 100]}
                        max={100}
                        step = {0.1}
                        onValueChange={(value) => handleSeekChange([value[0]/100])}
                        onValueCommit={handleSeekMouseUp}
                        className="w-full mb-2"
                        />
                        <div className=" flex items-center space-x-2 justify-end"> 
                            <div className="text-white">
                                {
                                    formatTime(played * (playerRef?.current?.getDuration() || 0))
                                }/{formatTime((playerRef?.current?.getDuration() || 0))}
                            </div>
                        </div>
                        <div className="flex items-center justif-between">
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" onClick={handlePlayPause}
                                    className="text-white hver:text-primary hover:bg-gray-700"
                                >
                                    {
                                        playing ? <Pause className="h-6 w-6"/> : <Play className="h-6 w-6"/>
                                    }
                                </Button>
                                <Button onClick={handleRewind} className="text-white hover:text-primary hover:bg-gray-700"
                                variant="ghost" size="icon">
                                    <RotateCcw className="h-6 w-6 "/>
                                </Button>
                                <Button onClick={handleForward} className="text-white hover:text-primary hover:bg-gray-700"
                                variant="ghost" size="icon">
                                    <RotateCw className="h-6 w-6 "/>
                                </Button>

                                <Button onClick={handleToggleFullScreen} className="text-white hover:text-primary hover:bg-gray-700"
                                variant="ghost" size="icon"
                                >
                                    {
                                        isFullScreen ? (<Minimize className="h-6 w-6"/>)  : ( <Maximize className="h-6 w-6"/>)
                                    }
                                </Button>

                                <Button onClick={handleToggleMute} className="text-white hover:text-primary hover:bg-gray-700"
                                variant="ghost" size="icon">
                                    {
                                        muted ? (<VolumeX/>) : (<Volume2/>)
                                    }
                                </Button>

                                <Slider
                                    value={[volume * 100]} 
                                    max={100}
                                    step={1}
                                    className="w-full" 
                                    onValueChange={(value) => {
                                        handleVolumeChange([value[0]/100])
                                    }}
                                />

                            </div>

                        </div>
                </div>
            )
        }
    </div> );
}

export default VideoPlayer;