import React, { useState } from 'react';
import './App.css';
import KifuReader from './components/KifuReader';
import SGFUploader from './components/SGFUploader';
import GameLibrary from './components/GameLibrary';
import GameViewer from './components/GameViewer';

function App() {
  const [sgfContent, setSgfContent] = useState<string>('');
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showLibrary, setShowLibrary] = useState<boolean>(false);
  // Track whether SGF content is from an upload or library selection
  const [isFromUpload, setIsFromUpload] = useState<boolean>(false);
  // Track whether to show the game viewer
  const [showGameViewer, setShowGameViewer] = useState<boolean>(false);
  // Store the SGF content for the game viewer
  const [gameViewerContent, setGameViewerContent] = useState<string>('');

  const handleFileLoaded = (content: string) => {
    setSgfContent(content);
    setIsFromUpload(true);
    // Hide library if it's open
    if (showLibrary) {
      setShowLibrary(false);
    }
  };

  const handleGameSelected = (content: string) => {
    // Don't display the board directly, just store the content and show the game viewer
    setGameViewerContent(content);
    setShowGameViewer(true);
  };

  const handleCloseGameViewer = () => {
    setShowGameViewer(false);
  };

  // Sample SGF content
  const sampleSGF = `(;GM[1]FF[4]CA[UTF-8]AP[CGoban:3]ST[2]
RU[Japanese]SZ[19]KM[6.50]
PW[White Player]PB[Black Player]
;B[pd]C[This is the first move.]
;W[dp]
;B[pp]
;W[dd]
;B[fc]
;W[cf]
;B[jd]
;W[qf]
;B[qh]
;W[qc]
;B[pc]
;W[qd]
;B[pe]
;W[pf]
;B[qj]
)`;

  return (
    <div className="App" style={{ 
      backgroundColor: '#f7f7f7', 
      minHeight: '100vh',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{ 
        backgroundColor: '#3a3a3a', 
        padding: '20px 0', 
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '32px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ 
              display: 'inline-block', 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#000', 
              border: '2px solid #fff',
            }}></span>
            AI-Kifu
            <span style={{ 
              fontSize: '18px', 
              fontWeight: 'normal', 
              opacity: 0.8, 
              marginLeft: '10px' 
            }}>
              Go Game Analysis Tool
            </span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '10px' }}>
            <button 
              onClick={() => setShowLibrary(!showLibrary)}
              style={{ 
                backgroundColor: showLibrary ? '#555' : 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {showLibrary ? 'Hide Library' : 'Game Library'}
            </button>
            <button 
              onClick={() => setShowHelp(!showHelp)}
              style={{ 
                backgroundColor: showHelp ? '#555' : 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17V17.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 13.5C11.9816 13.1754 12.0692 12.8536 12.2493 12.5803C12.4295 12.307 12.6933 12.0976 13 11.98C13.3759 11.8387 13.7132 11.6146 13.9856 11.3236C14.2579 11.0326 14.4577 10.6826 14.5693 10.3028C14.6809 9.92297 14.7015 9.52366 14.6292 9.13421C14.5568 8.74476 14.3937 8.37609 14.1537 8.05731C13.9138 7.73853 13.6031 7.47569 13.2457 7.28882C12.8883 7.10194 12.4934 6.99602 12.09 6.98C11.6924 6.96285 11.2961 7.03498 10.9279 7.19192C10.5597 7.34887 10.2279 7.58696 9.95462 7.89C9.68139 8.19303 9.47359 8.55392 9.34566 8.94675C9.21774 9.33958 9.17287 9.75451 9.21427 10.165" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {showHelp ? 'Hide Help' : 'Show Help'}
            </button>
          </div>
        </div>
      </header>
      
      <main style={{ 
        maxWidth: '1250px', 
        margin: '0 auto', 
        padding: '30px 20px',
        flex: '1 0 auto'
      }}>
        <p style={{ 
          fontSize: '16px', 
          marginBottom: '30px',
          color: '#555',
          lineHeight: '1.5'
        }}>
          Welcome to AI-Kifu! An open-source application dedicated to the Go community. Upload a Go game record (SGF file), paste SGF content below, or browse the extensive game library to analyze and review games.
        </p>
        
        {showHelp && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '8px',
            marginBottom: '30px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            width: '100%'
          }}>
            <h2 style={{ 
              color: '#333',
              fontSize: '22px',
              marginTop: 0,
              marginBottom: '15px',
              fontWeight: '600'
            }}>About Japanese Kifu Format</h2>
            <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
              AI-Kifu supports both standard SGF files and traditional Japanese kifu format. Japanese kifu typically follow this structure:
            </p>
            
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '6px',
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '14px',
              border: '1px solid #eee'
            }}>
{`# 棋譜（Japanese Kifu Format）
# 黒：Player Black
# 白：Player White
# 日付: 2023-04-06
# 結果: 黒の中押し勝ち

1. 黒: Q16
2. 白: D4
3. 黒: Q4
...`}
            </pre>
            
            <h3 style={{ fontSize: '18px', marginTop: '20px', color: '#444' }}>Key elements of Japanese kifu:</h3>
            <ul style={{ 
              listStyleType: 'none', 
              padding: 0, 
              margin: '15px 0', 
              lineHeight: '1.6' 
            }}>
              <li style={{ 
                padding: '8px 0 8px 25px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: '9px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'black',
                  borderRadius: '50%'
                }}></span>
                Header information with # prefix, containing player names, date, and result
              </li>
              <li style={{ 
                padding: '8px 0 8px 25px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: '9px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  border: '1px solid #ddd'
                }}></span>
                Moves are numbered sequentially, with color (黒/白 for black/white) and coordinates
              </li>
              <li style={{ 
                padding: '8px 0 8px 25px', 
                position: 'relative' 
              }}>
                <span style={{ 
                  position: 'absolute', 
                  left: 0, 
                  top: '9px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '3px',
                  border: '1px solid #ddd'
                }}></span>
                Coordinates use letters (A-T, excluding I) for columns and numbers (1-19) for rows
              </li>
            </ul>
            
            <p style={{ 
              padding: '12px', 
              backgroundColor: '#edf8ff', 
              borderLeft: '4px solid #3498db',
              borderRadius: '4px',
              color: '#555',
              marginTop: '15px'
            }}>
              Our parser automatically converts Japanese kifu format to SGF for rendering on the board.
            </p>
          </div>
        )}
        
        {/* Game library panel */}
        {showLibrary && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '8px',
            marginBottom: '30px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            width: '100%'
          }}>
            <GameLibrary onSelectGame={handleGameSelected} />
          </div>
        )}
        
        {/* SGF Uploader */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '25px', 
          borderRadius: '8px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          width: '100%'
        }}>
          <h2 style={{ 
            color: '#333',
            fontSize: '22px',
            marginTop: 0,
            marginBottom: '20px',
            fontWeight: '600'
          }}>
            Upload SGF File
          </h2>
          <SGFUploader onFileLoaded={handleFileLoaded} />
        </div>
        
        {/* Kifu Reader - Only show when file is uploaded */}
        {isFromUpload && sgfContent && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '8px',
            marginBottom: '30px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            width: '100%'
          }}>
            <h2 style={{ 
              color: '#333',
              fontSize: '22px',
              marginTop: 0,
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              Game Board
            </h2>
            <KifuReader sgfContent={sgfContent} />
          </div>
        )}
      </main>
      
      {/* Game Viewer Modal - shows when a game is selected from library */}
      {showGameViewer && (
        <GameViewer 
          sgfContent={gameViewerContent}
          onClose={handleCloseGameViewer}
        />
      )}

      <footer style={{
        backgroundColor: '#3a3a3a',
        color: 'white',
        padding: '20px 0',
        marginTop: 'auto',
        boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.05)',
        flexShrink: 0
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '15px',
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <p style={{ margin: '0 0 10px 0', fontWeight: '500' }}>AI-Kifu</p>
                <p style={{ margin: '0', opacity: '0.7', maxWidth: '500px' }}>
                  An open-source application dedicated to the Go community. Built to provide free access to Go game analysis and a comprehensive SGF library.
                </p>
              </div>
              <div style={{ minWidth: '200px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: '500' }}>Resources</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: '0.7' }}>
                  <li style={{ marginBottom: '5px' }}>
                    <a href="https://homepages.cwi.nl/~aeb/go/games/games/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>SGF Game Collection</a>
                  </li>
                  <li style={{ marginBottom: '5px' }}>
                    <a href="https://github.com/shiofreecss/AI-Kifu" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>GitHub Repository</a>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ 
              borderTop: '1px solid rgba(255,255,255,0.1)', 
              paddingTop: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <p style={{ margin: '0', opacity: '0.7' }}>
                © {new Date().getFullYear()} AI-Kifu
              </p>
              <p style={{ margin: '0', opacity: '0.7' }}>
                Powered by <a href="https://beaver.foundation" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>Beaver Foundation</a>
              </p>
              <p style={{ margin: '0', opacity: '0.7', fontSize: '12px' }}>
                Game data sourced from <a href="https://homepages.cwi.nl/~aeb/go/games/games/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>homepages.cwi.nl/~aeb/go/games/games</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
