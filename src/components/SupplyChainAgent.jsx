import React, { useState, useEffect, useRef } from 'react';
import './SupplyChainAgent.css';

const CONFIG_TIMER = 10; 

function SupplyChainAgent() {
  const [logs, setLogs] = useState([]);
  const [systemStatus, setSystemStatus] = useState('IDLE'); 
  const [timer, setTimer] = useState(CONFIG_TIMER);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  const [emailPayload, setEmailPayload] = useState(''); 
  const [senderEmail, setSenderEmail] = useState('');
  const [downloadData, setDownloadData] = useState(null);
  
  const chatEndRef = useRef(null);

  const addLog = (type, message) => {
    setLogs(prev => [...prev, { type, message }]);
  };

  useEffect(() => {
    let countdown;
    if (systemStatus === 'ALERT' && timer > 0) {
      countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (systemStatus === 'ALERT' && timer === 0) {
      clearInterval(countdown);
      addLog('system', '⏳ Override window expired. Proceeding with autonomous execution.');
      executeSwarm();
    }
    return () => clearInterval(countdown);
  }, [systemStatus, timer]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleIntervene = async () => {
    setSystemStatus('INTERVENING');
    addLog('system', '🛑 Human override engaged. Initializing secure neural link to Conversational Agent...');
    setIsChatLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/supply-chain/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_body: emailPayload,
          history: [],
          user_message: "I am taking manual control. Briefly summarize the issue from the intercepted email and ask me how I would like to proceed."
        })
      });
      const data = await response.json();
      setChatMessages([{ sender: 'ai', text: data.reply }]);
      addLog('success', '🔗 Neural link established. Awaiting human directives.');
    } catch (error) {
      setChatMessages([{ sender: 'ai', text: 'Error connecting to AI backend.' }]);
      addLog('system', '❌ Failed to establish neural link with Conversational Agent.');
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    if (e.key === 'Enter' && userInput.trim() && !isChatLoading) {
      const command = userInput;
      const newHistory = [...chatMessages, { sender: 'human', text: command }];
      
      setChatMessages(newHistory);
      setUserInput('');
      setIsChatLoading(true);
      
      addLog('analysis', `Transmitting human query to Agent: "${command}"...`);

      try {
        const response = await fetch('http://localhost:8000/api/supply-chain/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email_body: emailPayload,
            history: chatMessages,
            user_message: command
          })
        });
        
        const data = await response.json();
        let aiReply = data.reply;
        let shouldExecute = false;

        if (aiReply.includes('[EXECUTE]')) {
          shouldExecute = true;
          aiReply = aiReply.replace('[EXECUTE]', '').trim(); 
        }

        setChatMessages([...newHistory, { sender: 'ai', text: aiReply }]);
        
        if (shouldExecute) {
          addLog('success', '✅ Agent consensus reached. Initiating final orchestrated swarm execution based on human parameters...');
          setTimeout(() => executeSwarm(command), 1500);
        } else {
          addLog('action', 'Agent responded. Awaiting further instruction.');
        }

      } catch (error) {
        setChatMessages([...newHistory, { sender: 'ai', text: 'Connection lost.' }]);
        addLog('system', '❌ Connection to Conversational Agent lost.');
      } finally {
        setIsChatLoading(false);
      }
    }
  };

  const handleManualSync = async () => {
    setSystemStatus('POLLING');
    setLogs([]);
    addLog('system', 'Initiating secure IMAP connection to designated inbox...');

    try {
      const response = await fetch('http://localhost:8000/api/supply-chain/poll');
      const data = await response.json();

      if (data.status === 'exception_found') {
        addLog('action', `📥 Match found: Subject [SC001] from ${data.sender_email}`);
        addLog('success', '📧 [GMAIL] Marking SC001 as "Read".');
        
        setEmailPayload(data.email_body);
        setSenderEmail(data.sender_email); 
        setSystemStatus('ALERT');
        setTimer(CONFIG_TIMER); 
      } else {
        addLog('system', `Scan complete. Result: ${data.message || 'No unread SC001 emails found.'}`);
        setSystemStatus('IDLE');
      }
    } catch (error) {
      addLog('system', `❌ Backend connection failed: ${error.message}`);
      setSystemStatus('IDLE');
    }
  };

  const executeSwarm = async (humanCommand = "") => {
    setSystemStatus('EXECUTING');
    addLog('system', '🚀 Transmitting directive to Backend Swarm Orchestrator...');
    
    try {
      const response = await fetch('http://localhost:8000/api/supply-chain/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email_body: emailPayload,
          sender_email: senderEmail, 
          human_command: humanCommand 
        })
      });
      
      const data = await response.json();
      
      if (data.logs && data.logs.length > 0) {
        data.logs.forEach((log, index) => {
          setTimeout(() => addLog(log.type, log.message), index * 800); 
        });
      }

      const totalAnimationTime = data.logs ? data.logs.length * 800 + 500 : 1000;
      
      setTimeout(() => {
        if (data.success) {
          setDownloadData(data.file_b64); 
          setSystemStatus('RESOLVED');
        } else {
          setSystemStatus('IDLE');
          addLog('system', '⚠️ Swarm execution halted due to backend failure.');
        }
      }, totalAnimationTime);

    } catch (error) {
      addLog('system', `❌ Swarm Execution API failed: ${error.message}`);
      setSystemStatus('IDLE');
    }
  };

  const handleDownload = () => {
    if (!downloadData) return;
    
    const byteCharacters = atob(downloadData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Updated_Logistics_ERP.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="sc-container pt-4" id="supply-chain">
      <div className="sc-live-tool-wrapper card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
        <div className="sc-tool-banner p-4">
          <div className="d-flex align-items-center gap-2">
            <span className="badge sc-live-indicator">
              {systemStatus === 'ALERT' ? '⚠️ HUMAN OVERRIDE WINDOW' : 'AUTONOMOUS SWARM ACTIVE'}
            </span>
            <h4 className="m-0 fw-bold text-white">AeroFleet: Supply Chain Control Tower</h4>
          </div>
          <p className="m-0 mt-2 sc-text-light-blue small">
            Continuously monitors dedicated inboxes for [SC001] exception flags, offering a 10-second human intervention window before autonomously executing logistics assignments.
          </p>
        </div>

        <div className="sc-tool-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h6 className="fw-bold text-white mb-1">Live Swarm Terminal</h6>
              <p className="small text-muted m-0">
                Status: <span className="text-warning fw-bold">{systemStatus}</span>
              </p>
            </div>
            <button 
              onClick={handleManualSync} 
              disabled={systemStatus !== 'IDLE' && systemStatus !== 'RESOLVED'} 
              className="btn px-4 py-2 sc-sync-btn"
            >
              {systemStatus === 'POLLING' ? 'Polling Inbox...' : '🔄 Force Manual Inbox Sync'}
            </button>
          </div>

          <div className="row g-4">
            <div className={systemStatus === 'ALERT' || systemStatus === 'INTERVENING' ? 'col-md-7' : 'col-md-12'}>
              <div className="sc-agent-terminal p-4">
                <div className="text-muted small mb-3 border-bottom border-secondary pb-2">
                  ORCHESTRATOR LOGS // SWARM_STATUS: {systemStatus}
                </div>
                
                {logs.length === 0 && (
                  <div className="text-center text-muted mt-5">
                    System idle. Awaiting secure IMAP ping for keyword: <strong>SC001</strong>
                  </div>
                )}

                <div className="sc-logs-container">
                  {logs.map((log, idx) => (
                    <div key={idx} className="mb-3" style={{ fontSize: '13px', lineHeight: '1.6', fontFamily: 'monospace' }}>
                      <span style={{ 
                        color: log.type === 'action' ? '#3b82f6' : 
                               log.type === 'analysis' ? '#a855f7' : 
                               log.type === 'success' ? '#10b981' : 
                               log.type === 'system' && log.message.includes('❌') ? '#ef4444' : '#94a3b8',
                        whiteSpace: 'pre-wrap'
                      }}>
                        {log.message}
                      </span>
                    </div>
                  ))}
                  
                  {systemStatus === 'EXECUTING' && (
                    <div className="mt-4 text-warning" style={{ fontSize: '13px' }}>
                      <span className="spinner-grow spinner-grow-sm me-2" role="status" aria-hidden="true"></span>
                      Executing agentic resolution...
                    </div>
                  )}

                  {systemStatus === 'RESOLVED' && (
                    <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981' }}>
                      <div className="text-success fw-bold mb-2">✅ Resolution Finalized</div>
                      <button 
                        className="btn btn-sm btn-success w-100 fw-bold"
                        onClick={handleDownload}
                      >
                        ⬇️ Download Updated ERP Matrix (View Green Edits)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(systemStatus === 'ALERT' || systemStatus === 'INTERVENING') && (
              <div className="col-md-5">
                <div className="sc-chat-panel p-3 h-100 d-flex flex-column rounded-3" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}>
                  {systemStatus === 'ALERT' && (
                    <div className="text-center p-3 mb-3 rounded" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
                      <h5 className="text-danger fw-bold m-0">⚠️ CRITICAL EXCEPTION</h5>
                      <p className="text-light m-0 mt-2 small">Autonomous execution in:</p>
                      <h1 className="text-white display-4 fw-bold">{timer}s</h1>
                      <button onClick={handleIntervene} className="btn btn-danger w-100 mt-2 fw-bold">
                        🛑 INTERVENE NOW
                      </button>
                    </div>
                  )}

                  <div className="flex-grow-1 overflow-auto mb-3 sc-chat-history">
                    {chatMessages.map((msg, i) => (
                      <div key={i} className={`mb-3 ${msg.sender === 'human' ? 'text-end' : 'text-start'}`}>
                        <div className={`d-inline-block p-2 px-3 rounded-3 small ${msg.sender === 'human' ? 'bg-primary text-white' : 'bg-dark text-light border border-secondary'}`} style={{ maxWidth: '85%', whiteSpace: 'pre-wrap' }}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {systemStatus === 'INTERVENING' && (
                    <div className="mt-auto">
                      <input 
                        type="text" 
                        className="form-control bg-dark text-white border-secondary" 
                        placeholder={isChatLoading ? "Agent is typing..." : "Command the swarm..."} 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleSendMessage}
                        disabled={isChatLoading}
                      />
                      <small className="text-muted mt-1 d-block" style={{ fontSize: '11px' }}>Press Enter to transmit directive.</small>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplyChainAgent;