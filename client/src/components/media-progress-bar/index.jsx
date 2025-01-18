import {motion, progress} from 'framer-motion';
import { useEffect, useState } from 'react';

function MediaProgressBar({isMediaUploading, progress}) {

    const [showProgress, setShowProgress] = useState(false);
    const[animatedProgress,setAnimatedProgress] = useState(0)

    useEffect(() => {

        if(isMediaUploading){
            setShowProgress(true);
            setAnimatedProgress(progress);
        }
        else{
            const timer = setTimeout(() => {
                setShowProgress(false);
            },1000)

            return () => clearTimeout(timer);
        }

    }, [isMediaUploading, progress])
    
    if(!showProgress) return null

    return (
        <div className="w-full bg-gray-200 rounded-full h-6 mt-5 mb-5 relative overflow-hidden"> 
            <motion.div className='bg-blue-600 h-6 rounded-ful text-center font-bold'
            initial={{width : 0}}
            animate = {{
                width : `${animatedProgress}%`,
            }}
            transition= {{duration: 0.5, ease: 'easeInOut'}}
            >
                <span >
                UPLOADING...
                </span>
                {
                    progress >= 100 && isMediaUploading &&
                    (
                        <motion.div
                        className='absolute top-0 left-0 right-0 bg-blue-400 opacity-50 transition-all'
                        animate={{
                            x: ['0%', '100%', '0%'],
                        }}
                        transition={{
                            duration: 1,
                            repeat : Infinity,
                            ease: 'linear'
                        }}
                        />
                    )
                }
            </motion.div>
        </div>
      );
}

export default MediaProgressBar;