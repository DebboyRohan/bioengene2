import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Disable browser scroll restoration to prevent retaining the previous scroll position
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // Play the video if it exists
        if (videoRef.current) {
            videoRef.current.play().catch((error) => console.error('Video play failed:', error));
        }

        // Set a timer to match the video duration (2 seconds)
        const timer = setTimeout(() => {
            // Navigate to the home page
            navigate('/home');
            // Scroll to the top of the page smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Hide the loader by calling the callback
            onLoadingComplete();
        }, 2000); // 2 seconds to match the video duration

        // Cleanup timer on unmount
        return () => clearTimeout(timer);
    }, [navigate, onLoadingComplete]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <video
                ref={videoRef}
                src="/tracer/Public/assets/videos/FinalLoader.mp4" // Adjust path based on your project structure
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Loader;