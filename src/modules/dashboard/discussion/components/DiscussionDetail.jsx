import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import DashboardLayout from '../../../../components/layout/dashboard/DashboardLayout';
import Modal from '../../components/Modal';
import CreatePaperModal from  "./Modal/CreatePaperModal";
import { Plus, Search, Share2, FileCheck, MoreVertical, ChevronRight, ArrowLeft, Send, Bot, Sparkles, RefreshCw, FileStack, Users, Clock, BookOpen, Mic, Play, Pause, Square, X } from 'lucide-react';
import { createDiscussionMessage, discussionSummaryList, getDiscussionById, makeDiscussionMessagesSummary, streamDiscussionMessage, transcribeAudio } from '../../../../services/discussion';
import ReactMarkdown from "react-markdown";
import { getTimeAgo } from '../../../../utils/getTimeAgo';
import { getWorksheetList } from '../../../../services/worksheet';
import {v4 as uuidv4} from 'uuid';
import SummaryPreviewModal from './Modal/SummaryPreviewModal';
import { toast } from 'react-toastify';


const DiscussionDetail = () => {
    const [searchParams] = useSearchParams();
    const selectedDiscussionId = searchParams.get('discussion');
   
    const navigate = useNavigate();
    const [showPaperModal, setShowPaperModal] = useState(false);

     
    // from here the real work

    const [discussion, setDiscussion] = useState(null);
    const [message, setMessage] = useState('');
    const [worksheets, setWorksheets] = useState([]);
    const [summaryList, setSummaryList] = useState([]);
    const [showSummaryPreviewModal, setShowSummaryPreviewModal] = useState(false);
    const [summaryContent, setSummaryContent] = useState('');

    const messagesContainerRef = useRef(null);
    const messagesEndRef = useRef(null);
    const shouldAutoScrollRef = useRef(true);
    const textareaRef = useRef(null);

    // Audio recording state
    const [isRecordingMode, setIsRecordingMode] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const streamRef = useRef(null);
    const timerIntervalRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameRef = useRef(null);
    const shouldVisualizeRef = useRef(false);
    const canvasRef = useRef(null);
    const timerDisplayRef = useRef(null);
    const recordingStartTimeRef = useRef(null);
    const pausedTimeRef = useRef(0);
    const totalPausedTimeRef = useRef(0);



    const fetchSummaryList = async () => {
      try {
        const summaryList = await discussionSummaryList(selectedDiscussionId);

        setSummaryList(summaryList?.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDiscussion = async () => {
      try {
         
        const discussion = await getDiscussionById(selectedDiscussionId);
  
      setDiscussion(discussion);
      scrollToBottom();
      } catch (error) {
        console.error(error);
      }
    };


    // const createDiscussionMessageHandler = async (payload) => {
    //   try {
    //     const payload = {
    //       discussion_id: selectedDiscussionId,
    //       content: message,
       
    //     };
    //     setDiscussion((prev) => ({
    //       ...prev,
    //       messages: [...prev?.messages, {
    //         id: uuidv4(),
    //         role: 'user',
    //         content: message,
    //         created_at: new Date().toLocaleString(),
    //         is_summarized: false,
    //       }],
    //     }));

    
     
    //     const discussionMessage = await createDiscussionMessage(payload);

    //     setDiscussion((prev) => ({
    //       ...prev,
    //       messages: [...prev?.messages, {
    //         id: uuidv4(),
    //         role: 'assistant',
    //         content: discussionMessage,
    //         created_at: new Date().toLocaleString(),
    //         is_summarized: false,
    //       }],
    //     }));
    //     setMessage('');

    //     const total_count_un_summarized = discussion?.messages?.filter((msg) => msg.is_summarized === false);
    //     console.log("total_count_un_summarized", total_count_un_summarized); 
    //     if(total_count_un_summarized?.length >=8){
      
    //       const status = await makeDiscussionMessagesSummaryHandler();

    //       if(status?.success){
    //         fetchSummaryList();
    //         total_count_un_summarized.forEach((msg) => {
    //           setDiscussion((prev) => ({
    //             ...prev,
    //             messages: prev?.messages?.map((m) => m.id === msg.id ? { ...m, is_summarized: true } : m),
    //           }));
    //         });
    //       }
         

    //     }
    //   } catch (error) {
    //     console.error(error);
    //     toast.error(error.message);
    //   }
    // };

    const createDiscussionMessageHandler = async () => {
      const payload = {
        discussion_id: selectedDiscussionId,
        content: message,
      };
    
      // 1️⃣ Add USER message instantly
      setDiscussion((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: uuidv4(),
            role: "user",
            content: message,
            created_at: new Date().toISOString(),
            is_summarized: false,
          },
          {
            id: "streaming-ai",
            role: "assistant",
            content: "",
            created_at: new Date().toISOString(),
            is_summarized: false,
          },
        ],
      }));
    
      setMessage("");

      
  // Reset textarea height
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto"; // reset
  }
    
      // 2️⃣ Stream AI response
      await streamDiscussionMessage(payload, (chunk) => {
        setDiscussion((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === "streaming-ai"
              ? { ...msg, content: msg.content + chunk }
              : msg
          ),
        }));
        scrollToBottom();
      });
    
      // 3️⃣ Replace temporary ID after stream ends
      setDiscussion((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === "streaming-ai"
            ? { ...msg, id: uuidv4() }
            : msg
        ),
      }));
      // setTimeout(scrollToBottom, 0);

    };
    
    const makeDiscussionMessagesSummaryHandler = async () => {
      try {
        const summaryStatus = await makeDiscussionMessagesSummary(selectedDiscussionId);
    
        return summaryStatus;

      } catch (error) {
        console.error(error);
      
      }
    };
    const fetchWorksheets = async () => {
      const worksheets = await getWorksheetList();
      setWorksheets(worksheets);
    };

    console.log("discussion", discussion);




    useEffect(() => {
      fetchDiscussion();
      makeDiscussionMessagesSummaryHandler();
      fetchWorksheets();
      fetchSummaryList();
    }, [selectedDiscussionId]);

    useEffect(() => {
      const container = messagesContainerRef.current;
      if (!container) return;
    
      const handleScroll = () => {
        // const isAtBottom =
        //   container.scrollHeight - container.scrollTop - container.clientHeight < 50;

        const isAtBottom =
  Math.abs(
    container.scrollHeight -
    container.clientHeight -
    container.scrollTop
  ) < 10;
    
        shouldAutoScrollRef.current = isAtBottom;
      };
    
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    useLayoutEffect(() => {
      scrollToBottom();
    }, [discussion?.messages?.length]);

    // Adjust textarea height when message changes (e.g., after transcription)
    useEffect(() => {
      if (message && textareaRef.current) {
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          adjustTextareaHeight(textareaRef.current);
        });
      }
    }, [message]);

    // const scrollToBottom = () => {
    //   if (shouldAutoScrollRef.current) {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }
    // };




    const scrollToBottom = () => {
      if (!shouldAutoScrollRef.current) return;
    
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "auto", // IMPORTANT: auto, not smooth
          block: "end",
        });
      });
    };

    // Reusable function to adjust textarea height
    const adjustTextareaHeight = (textareaElement) => {
      if (!textareaElement) return;
    
      // Reset height
      textareaElement.style.height = "auto";
    
      // Max height ~ 6 lines (ChatGPT-like)
      const maxHeight = 160;
      textareaElement.style.height = Math.min(textareaElement.scrollHeight, maxHeight) + "px";
    };

    const handleInputChange = (e) => {
      const el = e.target;
      setMessage(el.value);
      adjustTextareaHeight(el);
    };
    
    // Audio recording functions
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Update timer display directly (no re-renders)
    const updateTimerDisplay = () => {
      if (timerDisplayRef.current && recordingStartTimeRef.current) {
        const elapsed = Math.floor((Date.now() - recordingStartTimeRef.current - totalPausedTimeRef.current) / 1000);
        timerDisplayRef.current.textContent = formatTime(elapsed);
      }
    };

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        
        // Set up Web Audio API for visualization
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        dataArrayRef.current = dataArray;
        
        // Start visualization loop using canvas (no state updates = no re-renders)
        shouldVisualizeRef.current = true;
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const visualizeLoop = () => {
            if (shouldVisualizeRef.current && analyserRef.current && dataArrayRef.current && ctx) {
              analyserRef.current.getByteFrequencyData(dataArrayRef.current);
              
              // Clear canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw bars
              const barWidth = canvas.width / 50;
              const barGap = 1;
              const maxBarHeight = canvas.height;
              
              for (let i = 0; i < 50; i++) {
                const barHeight = (dataArrayRef.current[i] / 255) * maxBarHeight;
                const x = i * (barWidth + barGap);
                
                // Create gradient
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                gradient.addColorStop(0, '#3b82f6');
                gradient.addColorStop(1, '#8b5cf6');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
              }
              
              animationFrameRef.current = requestAnimationFrame(visualizeLoop);
            }
          };
          visualizeLoop();
        }
        
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          setAudioBlob(audioBlob);
          // Stop all tracks to release microphone
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
          }
          // Clean up audio context
          if (audioContextRef.current) {
            audioContextRef.current.close();
          }
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          // Clear canvas
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
        setIsPaused(false);
        
        // Start timer using ref (no re-renders)
        recordingStartTimeRef.current = Date.now();
        totalPausedTimeRef.current = 0;
        pausedTimeRef.current = 0;
        if (timerDisplayRef.current) {
          timerDisplayRef.current.textContent = '0:00';
        }
        timerIntervalRef.current = setInterval(() => {
          updateTimerDisplay();
        }, 100); // Update every 100ms for smooth display
      } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Could not access microphone. Please check permissions.');
      }
    };

    const pauseRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        shouldVisualizeRef.current = false;
        pausedTimeRef.current = Date.now(); // Track when we paused
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        // Clear canvas
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };

    const resumeRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        shouldVisualizeRef.current = true;
        
        // Resume timer - add paused duration to total paused time
        if (pausedTimeRef.current) {
          totalPausedTimeRef.current += Date.now() - pausedTimeRef.current;
          pausedTimeRef.current = 0;
        }
        timerIntervalRef.current = setInterval(() => {
          updateTimerDisplay();
        }, 100);
        
        // Resume visualization
        const canvas = canvasRef.current;
        if (analyserRef.current && dataArrayRef.current && canvas) {
          const ctx = canvas.getContext('2d');
          const visualizeLoop = () => {
            if (shouldVisualizeRef.current && analyserRef.current && dataArrayRef.current && ctx) {
              analyserRef.current.getByteFrequencyData(dataArrayRef.current);
              
              // Clear canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw bars
              const barWidth = canvas.width / 50;
              const barGap = 1;
              const maxBarHeight = canvas.height;
              
              for (let i = 0; i < 50; i++) {
                const barHeight = (dataArrayRef.current[i] / 255) * maxBarHeight;
                const x = i * (barWidth + barGap);
                
                // Create gradient
                const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
                gradient.addColorStop(0, '#3b82f6');
                gradient.addColorStop(1, '#8b5cf6');
                
                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
              }
              
              animationFrameRef.current = requestAnimationFrame(visualizeLoop);
            }
          };
          visualizeLoop();
        }
      }
    };

    const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setIsPaused(false);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      }
    };

    const cancelRecording = () => {
      shouldVisualizeRef.current = false;
      if (mediaRecorderRef.current) {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setIsRecording(false);
      setIsPaused(false);
      setAudioBlob(null);
      audioChunksRef.current = [];
      recordingStartTimeRef.current = null;
      totalPausedTimeRef.current = 0;
      pausedTimeRef.current = 0;
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (timerDisplayRef.current) {
        timerDisplayRef.current.textContent = '0:00';
      }
      // Clear canvas
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };

    const toggleRecordingMode = () => {
      if (isRecording) {
        // If recording, stop and cancel
        cancelRecording();
      }
      setIsRecordingMode(!isRecordingMode);
      setMessage(''); // Clear message when switching modes
    };


    const sendRecording = async () => {
      try {
        console.log('Audio blob:', audioBlob);
        if (!audioBlob) {
          toast.error('No audio blob found');
          return;
        }
        const formData = new FormData();
        // formData.append('file', audioBlob);
        formData.append('file', audioBlob, 'recording.webm');
        const response = await transcribeAudio(formData);
        console.log('Response:', response);
        toast.success('Recording sent successfully');
        cancelRecording();
        setIsRecordingMode(false);
        setMessage(response.data);
        // Textarea height will be automatically adjusted by useEffect when message changes
       
      } catch (error) {
        console.error('Error sending recording:', error);
        toast.error('Error sending recording');
      }
    };

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, []);
    
    


    return (
      <section>
        {/* not this should be scrollable*/}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
            <ChevronRight size={16} />
            <Link to="/dashboard/discussion" className="hover:text-blue-600 dark:hover:text-blue-400">Discussions</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 dark:text-white">{discussion?.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard/discussion')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-900 dark:text-white" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{discussion?.title}</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPaperModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <Plus size={18} />
                Create Paper
              </button>
              <button className="px-4 py-2 border dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
                <Share2 size={18} />
                Share
              </button>
              <button className="px-4 py-2 border dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
                <FileCheck size={18} />
                Export
              </button>
              {/* <button className="px-4 py-2 border dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white">
                <MoreVertical size={18} />
              </button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            

            {/* this section should be scrollable */}
            <div
            //  ref={messagesContainerRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:col-span-2 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Conversation</h2>

              {/* Chat Messages */}
              <div 
                ref={messagesContainerRef}
              className="space-y-6 mb-6">
                {discussion?.messages?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg?.role === 'assistant' ? "justify-start" : "justify-end"
                    }`}
                  >
                    {/* Avatar - only for AI (left side) */}
                    {/* {msg.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        {msg.avatar}
                      </div>
                    )} */}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[95%] rounded-2xl px-4 py-3 shadow-sm text-sm ${
                        msg.role === 'assistant'
                          ? "bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 rounded-tl-none"
                          : "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">
                          {msg.user}
                        </span>

                        {msg.role === 'assistant' && (
                          <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full flex items-center gap-1">
                            <Bot size={12} /> AI
                          </span>
                        )}

                        <span className="text-[10px] opacity-70">{msg.created_at ? getTimeAgo(msg.created_at) : ''}</span>
                      </div>

                      {/* <p>{msg.message}</p> */}
                      <ReactMarkdown>{msg?.content}</ReactMarkdown>

                      {/* AI suggestion button only for USER messages */}
                      {msg.role === 'user' && (
                        <button className="text-xs mt-2 text-white/80 hover:text-white flex items-center gap-1">
                          <Sparkles size={12} />
                          Ask AI to expand
                        </button>
                      )}
                    </div>

                    {/* Avatar - only for USER (right side) */}
                    {/* {msg.role === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                        {msg.avatar}
                      </div>
                    )} */}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

             {/* input send message section start */}
       

              {/* version 2 */}

          {/* Sticky Chat Input */}
              <div className="sticky bottom-0 z-10  dark:border-gray-700 bg-white dark:bg-gray-800 ">
                {!isRecordingMode ? (
                  // Typing Mode
                <div className="flex items-end gap-2 rounded-xl border dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700">
                  {/* ➕ Upload */}
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0"
                  >
                    <Plus size={18} />
                  </button>

                    {/* 🎤 Mic / Device - Toggle Recording Mode */}
                  <button
                    type="button"
                      onClick={toggleRecordingMode}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0"
                  >
                    <Mic size={18} />
                  </button>

                  {/* 📝 Auto-growing textarea */}
                  <textarea
                    rows={1}
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 outline-none min-h-7 max-h-[160px] overflow-y-auto"
                ref={textareaRef}
                id="textarea-message-id"
                />

                  {/* 🚀 Send (fixed size) */}
                  <button
                    onClick={createDiscussionMessageHandler}
                    disabled={!message.trim()}
                    className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white disabled:opacity-50 flex-shrink-0"
                  >
                    <Send size={18} />
                  </button>
                  </div>
                ) : (
                  // Recording Mode
                  <div className="rounded-xl border dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 space-y-3">
                    {/* Recording Controls Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={toggleRecordingMode}
                          className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <X size={18} />
                        </button>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {isRecording ? (isPaused ? 'Recording Paused' : 'Recording...') : 'Ready to Record'}
                        </span>
                        {isRecording && (
                          <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse"></div>
                            <span ref={timerDisplayRef} className="text-xs font-mono">0:00</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Audio Visualizer - Canvas based (no re-renders) */}
                    {isRecording && !isPaused && (
                      <div className="flex items-center justify-center py-2">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={60}
                          className="w-full max-w-[400px] h-[60px]"
                        />
                      </div>
                    )}
                    {isPaused && (
                      <div className="flex items-center justify-center py-2 h-[60px]">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Recording paused</div>
                      </div>
                    )}

                    {/* Recording Action Buttons */}
                    <div className="flex items-center justify-center gap-3">
                      {!isRecording ? (
                        <button
                          onClick={startRecording}
                          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
                        >
                          <Mic size={18} />
                          Start Recording
                        </button>
                      ) : (
                        <>
                          {isPaused ? (
                            <button
                              onClick={resumeRecording}
                              className="p-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-shadow"
                            >
                              <Play size={18} />
                            </button>
                          ) : (
                            <button
                              onClick={pauseRecording}
                              className="p-2.5 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                            >
                              <Pause size={18} />
                            </button>
                          )}
                          <button
                            onClick={stopRecording}
                            className="p-2.5 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                          >
                            <Square size={18} />
                          </button>
                          <button
                            onClick={cancelRecording}
                            className="p-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Send Recording Button (shown after recording stops) */}
                    {audioBlob && !isRecording && (
                      <div className="flex items-center justify-center gap-3 pt-2 border-t dark:border-gray-600">
                        <button
                          onClick={sendRecording}
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
                        >
                          <Send size={16} />
                          Send Recording
                        </button>
                        <button
                          onClick={cancelRecording}
                          className="px-4 py-2 rounded-lg border dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                </div>
                )}
              </div>


              {/* input send message section end */}



              
         
       
            </div>

            {/* this section should be scrollable */}
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
         
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-xl border border-blue-200 dark:border-gray-700 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={18} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Based Summary</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {/* only 30 characters */}
                  {summaryList?.map((summary, index) => (
       
                    <div
                    
                    onClick={() => {
                      setShowSummaryPreviewModal(true);
                      setSummaryContent(summary?.content);
                    }} key={summary.id} className="text-xs text-gray-700 dark:text-gray-300 pl-2 border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-2 transition-all duration-300">
                      Summary {index + 1}: {summary?.token_count} words
                    </div>
                
                  ))}
                </div>
                <button className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  <RefreshCw size={12} />
                  Regenerate summary
                </button>
              </div>

            {discussion?.doc_id 
               && 
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
               <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Linked Document</h3>
               <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => window.open(`http://127.0.0.1:8000${discussion?.uploaded_doc?.doc_link}`, '_blank')}>
                 <FileStack size={20} className="text-blue-600" />
                 <div className="flex-1 min-w-0" >
                   <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{discussion?.uploaded_doc?.name}</p>
                   <p className="text-xs text-gray-600 dark:text-gray-400">{discussion?.uploaded_doc?.doc_link.split('.')?.pop()?.toUpperCase()}</p>
                 </div>
               </div>
            
             </div>
            }

             

            {discussion?.papers?.length > 0 && 
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Papers</h3>
            <div className="flex flex-wrap gap-2 ">
              {discussion?.papers?.map((paper) => (
                <p 
                
                key={paper.id} 
                onClick={() => window.open(`/dashboard/worksheet/paper-question-list/${paper.id}?worksheet_id=${paper.worksheet_id}&name=${paper.title}`, '_blank')}
                className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
               
                  {paper.title}
                </p>
              ))}
            </div>
          </div>}
            </div>
          </div>
        </div>

        {showPaperModal && (
          <CreatePaperModal
            onClose={() => setShowPaperModal(false)}
            discussionTitle={discussion.title}
            worksheets={worksheets}
            discussionId={selectedDiscussionId}
          />
        )}
        {showSummaryPreviewModal && (
          <SummaryPreviewModal
            onClose={() => setShowSummaryPreviewModal(false)}
            summaryContent={summaryContent}
          />
        )}
      </section>
    );
}

export default DiscussionDetail