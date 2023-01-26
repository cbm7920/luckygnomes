import styled from "styled-components";
import { useState, useRef } from "react";
import "./App.css";
import DiscordLogo from './assets/social-media-icons/discord2.png';
import TwitterLogo from './assets/social-media-icons/twitter_32x32.png';
import HeyMintLogo from './assets/social-media-icons/heymint.png';
import Check from "./Check";
import LandingPage from "./LandingPage";
import { Flex } from "@chakra-ui/react";
import { Howl } from "howler";
import Creatures from "./assets/sound/1.mp3";
import HoverSound from "./assets/sound/click-21156.mp3";
import { useEffect } from "react";
import clickSound from "./assets/sound/hover.mp3";

const TextElement = styled(Text)`
  font-size: 38px;
  text-shadow: 0 10px #000000;

  &:hover{
    color:red;
 }

  @media (max-width: 50vw) {
    font-size: 24px;
  }
`;
const ButtonElement = styled.button`
background-color: #D6517D;
border-radius: 5px;
box-shadow: 0px 2px 2px 1px #0F0F0F;
color: black;
cursor: pointer;
font-family: inherit;
padding: 5px;
margin: 0 15px;
transition: background-color 0.2s ease;
&:hover {
  background-color: #ff5252;
  box-shadow: 0px 2px 2px 1px #FFFF00;
  color: white;
}
`;

function App() {
  const [buttonText, setButtonText] = useState("Music");
  const [showCheck, setShowCheck] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("Check");
  const [shadow, setShadow] = useState("#FF000000");
  const [isPlaying, setIsPlaying] = useState(false);
  const [shake, setShake] = useState(false);
  const soundRef = useRef(new Howl({
    src: Creatures,
    loop: true
  }));
  const clickSoundRef = useRef(new Howl({
    src: clickSound,
    loop: false
  }));
  const hoverSoundRef = useRef(new Howl({
    src: HoverSound,
    loop: false
  }));
  useEffect(() => {
    soundRef.current.play();
    setIsPlaying(true);
  }, []);


  const SoundPause = () => {
    clickSoundRef.current.play();
    if (isPlaying) {
      soundRef.current.stop();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };
  function handleMouseEnter() {
    setShake(true);
    hoverSoundRef.current.play();
    setShadow("#FFFF00");
  }

  function handleMouseLeave() {
    setShake(false);
    setShadow("#FF000000");
  }

  return (
    <div>
      <div className="App">
      <Flex justify="flex-end" align="center" width="18%" padding="1%">
      <div
      className={`logo-container ${shake ? 'shake' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
   <a href="https://discord.gg/wkRaMTRaZA" target="_blank">
  <img src={DiscordLogo} alt="Join our Discord server" width="50px" height="50px" style={{marginRight: "15px"}}/>
</a>
    </div>
    <div
      className={`Twitter-logo-container ${shake ? 'shake' : ''}`}
      onMouseEnter={() => { handleMouseEnter() }}
      onMouseLeave={handleMouseLeave}
    >
      <a href="https://twitter.com/HungerGamesNFT" target="_blank">
      <img src={TwitterLogo} alt="Join our Discord server" width="50px" height="50px" style={{marginRight: "15px"}}/>
      </a>
    </div>
    <div
      className={`HeyMint-logo-container ${shake ? 'shake' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href="https://heymint.xyz/luckygnomes" target="_blank">
      <img src={HeyMintLogo} alt="Join our Discord server" width="50px" height="50px" style={{marginRight: "15px"}}/>
</a>
    </div>
<div className="button-container">


  <ButtonElement
    className="shake"
    type="submit"
    onClick={SoundPause}
    onMouseEnter={() => { setButtonText("Music"); hoverSoundRef.current.play(); }}
    onMouseLeave={() => setButtonText(isPlaying ? "Stop" : "Play")}
  >
    {buttonText}
  </ButtonElement>
</div>
        </Flex>
        {!showCheck ? (
          <LandingPage
            onButtonClick={() => {
              clickSoundRef.current.play();
              
              setShowCheck(true);
            }}
          />
        ) : (
          <Check
            onButtonClick={() => {
              clickSoundRef.current.play();
              setShowCheck(false);
            }}
          />
        )}
      </div>
      <div className="moving-background">
      
      </div>
    </div>
  );

}

export default App;
