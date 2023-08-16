import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import house from './house.png'
import bath from './bath.png'
import remax from './remax.png'
import logo_house from './logo_house.png'
import kitchen_1 from './kitchen_1.png'
import kitchen_2 from './kitchen_2.png'

import { sequence } from '0xsequence'

import { 
  Card,
  Text,
  Box, 
  Button,
  IconButton, 
  SunIcon, 
  MoonIcon,
  Spinner,
  TextInput,
  CheckmarkIcon,
  useTheme } from '@0xsequence/design-system'

import { ethers, utils } from 'ethers'
import {Group} from './Group'

import {Box as BoxM} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Button as ButtonM} from '@mui/material';
import Typography from '@mui/material/Typography';

const steps = ['Contact','Approve Contract', 'Place Bid'];

var Carousel = require('react-responsive-carousel').Carousel;

function Approve(props: any){
  const approve = async () => {
    const wallet = sequence.getWallet()
    const charmContract = '0x64fab353dbdb239d4eeee3d50bbcf87f3adbb4ad'
    const houseContract = charmContract
    const maxAllowance = ethers.constants.MaxUint256;

    const erc20Interface = new ethers.utils.Interface([
      'function approve(address spender, uint256 amount) public returns (bool)'
    ])

    const data = erc20Interface.encodeFunctionData(
      'approve', [houseContract, maxAllowance.toString()]
    )

    const tx = {
      to: charmContract,
      data
    }
    const signer = wallet.getSigner(84531)
    // const res = await signer.sendTransaction(tx)
    props.handleNext()
  }

  return(<>
    <Box>
      <Text justifyContent={'center'}>approve the agent to spend your tokens when the deal is closed</Text>
    </Box>
    <br/>
    <br/>
    <br/>
    <br/>
    <Box justifyContent={'center'}>
        <Button onClick={approve} variant="primary" label='approve'></Button>
    </Box>
  </>
  )
}

function Bid(props: any){
  const [price, setPrice] = useState<number>(0)

  const bid = async () => {
    const wallet = await sequence.getWallet()
    const signer = await wallet.getSigner(84531)
    const provider = new ethers.providers.JsonRpcProvider('https://nodes.sequence.app/base-goerli');
    const contractAddress = '0x0b1bD97aF47cCbc939754Cdf4E1e120799C908B0';
    
    const contract = new ethers.Contract(contractAddress, [
      'function finalizeAuction(uint price_, address addressOfNewOwner_, bytes calldata signature_) external'], 
      signer
    );

    const hash = utils.solidityPack(['uint'], [price])
    const signature = await signer.signMessage(hash, {chainId: 84531})
    const response = await contract.finalizeAuction(price, props.address, signature);

    const res = await fetch("http://localhost:4000/signature", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        // signature: signature,
        address: props.address
      }),
    })

    const json = await res.json()
    console.log(json)
    props.handleNext()
  }

  return(<>
    <Box>
      <Text justifyContent={'center'}>input your bid with ⚭</Text>
    </Box>
    <br/>
    <br/>
    <TextInput placeholder="price" onChange={(evt: any) => setPrice(evt.target.value)}></TextInput>
    <br/>
    <br/>
    <Box justifyContent={'center'}>
        <Button onClick={bid} variant="primary" label='bid'></Button>
    </Box>
  </>
  )
}

function Contact(props: any){
  const [number, setNumber] = useState<any>(null)

  const submit = async () => {
  //   const res = await fetch("http://localhost:4000/signup/number", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ 
  //       number: number,
  //       address: props.address
  //     }),
  //   })
    // const json = await res.json()
    // console.log(json)
    props.handleNext()
  }
  return(<>
    <Box>
      <Text justifyContent={'center'}>input your number to get a text when the deal has closed</Text>
      <br/>
      <br/>
      <TextInput placeholder="phone number" onChange={(evt: any) => setNumber(evt.target.value)}></TextInput>
      <br/>
      <br/>
      <Box justifyContent={'center'}>
        <Button onClick={submit} variant="primary" label='submit'></Button>
      </Box>
    </Box>
  </>
  )
}

let count = 0;
function HorizontalLinearStepper(props: any) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [panel, setPanel] = React.useState(null)

  const Compass = (activeStep: any, connectors: any, connect: any, address: any, handleNext: any) => {
    let navigator;
      switch(activeStep){
        case 0:
          navigator = <Contact address={props.address} handleNext={handleNext}/>
          break;
        case 1:
          navigator = <Approve handleNext={handleNext}/>
          break;
        case 2:
          navigator = <Bid address={props.address} handleNext={handleNext}/>
          break;
      }
    return(
      <>
      <br/>
      <br/>
      <br/>
      <br/>
        {
          navigator
        }
      </>
    )
  }
  const isStepOptional = (step: number) => {
    return step === 4;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    count = 0;
    props.disconnect()
  };

  return (
    <BoxM sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <br/>
          <br/>
          <br/>
          <br/>
        <Text justifyContent={'center'}>you're all done</Text>
        <br/>
        <Box justifyContent={'center'}><CheckmarkIcon justifyContent={'center'}/></Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {Compass(activeStep, props.connectors, props.connect, props.address, handleNext)}
          {/* <BoxM sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <BoxM sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep === steps.length - 1 ? <Button onClick={handleNext}>
              {'Finish'}
            </Button> : null}
            
          </BoxM> */}
        </React.Fragment>
      )}
    </BoxM>
  );
}

function App() {
  const { theme, setTheme } = useTheme()
  const addresses = ['1 Eagle Rd.', '1234 Maple Street','9012 Elm Lane', '890 Cedar Court']
  const [hidden, setHidden] = useState<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [address, setAddress] = useState<string | undefined>('')

  setTheme('dark')
  sequence.initWallet({defaultNetwork: 'base-goerli'})

  const lookups = addresses.map((address: any) => {
    return <div style={{cursor: 'pointer', width: '200px'}}>
      <Text color="text100" variant="large" style={{textAlign: 'left'}}>{address}</Text>
      <br/>
      <br/>
    </div>
  })

  React.useEffect(() => {
    
    // Function to check scroll position and set the boolean flag
    function checkScrollPosition() {
      const scrollPosition = window.scrollY || window.pageYOffset; // Get current scroll position
      // const windowHeight = window.innerHeight; // Get the height of the viewport
      const windowHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight); // Get the full page height
      const scrollThreshold = windowHeight * 0.4; // 20% of viewport height

      if (scrollPosition >= scrollThreshold) {
        setHidden(false)
      } else {
        setHidden(true)
      }
    }
    // Attach the event listener to the scroll event
    window.addEventListener('scroll', checkScrollPosition);
    // Call the function initially to set the flag based on initial scroll position
    checkScrollPosition();

    if (window.innerWidth <= 768) {
      // Code to run when on a mobile device
      console.log("Mobile device detected");
      setHidden(false)
    } 
  }, [])

  const connect = async () => {
    const wallet = sequence.getWallet()
    const details = await wallet.connect({app: 'house'})

    if(details.connected){
      setIsLoggedIn(true)
      setAddress(details.session?.accountAddress)
    }
  }

  return (
    <>
    {
      isLoggedIn 
      ? 
      <>
        <Box marginY="0" marginX="auto" paddingX="6" style={{ maxWidth: '720px', marginTop: '80px', marginBottom: '80px' }}>
          <Box style={{left: '11px', top: '20px', position: 'fixed'}}>
            <img onClick={() => setIsLoggedIn(false)} src={logo_house} width={'8%'} style={{left: '10px', cursor: 'pointer'}}/>
            <br/>
          </Box>
          <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px', textAlign:'center' }} justifyContent={'center'}>
          <Card style={{ margin: '5px'}}>
          <Text color="text100" variant="large">1 Eagle Rd.</Text>
            <br/>
            <br/>
            <Text color="text100" variant="large">$800,000 Listing</Text>
            <br/>
            <br/>
          </Card>
          <Card style={{ margin: '5px'}}>
            <img src={house} width={'50%'}/>
          </Card>
          <Card style={{ margin: '5px'}}>
            <img src={remax} width={'80%'}/>
          </Card>
          </Box>
          <br/>
          <br/>
          <br/>
          <Box>
            <HorizontalLinearStepper address={address}/>
          </Box>
        </Box>
      </> 
      : 
      <>
        <Box marginY="0" marginX="auto" paddingX="6" style={{ maxWidth: '720px', marginTop: '80px', marginBottom: '80px' }}>
        <Box style={{left: '11px', top: '20px', position: 'fixed'}}>
          <img src={logo_house} width={'8%'} style={{left: '10px'}}/>
          <br/>
          {hidden ? lookups : null}
        </Box>
        <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px' }}>
          <Card>

          <Text color="text100" variant="large">1 Eagle Rd.</Text>
          <br/>
          <br/>
          <Text color="text100" variant="large">$800,000 Listing</Text>
          <br/>
          <br/>
          </Card>

        </Box>
        <br/> 
        <Box marginBottom="4" justifyContent={'center'}>
          <Carousel showArrows={true}/* onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}*/>
                <div>
                    <img src={house} width={'50%'}/>
                    <p className="legend">Front facade</p>
                </div>
                <div>
                    <img src={'https://st.hzcdn.com/fimgs/pictures/sunrooms/stockbridge-ma-octagon-kristine-sprague-architect-leed-ap-img~8e41ee6803f3e78b_0440-1-cf0fad7-w800-h800-b2-p0.jpg'} />
                    <p className="legend">Study</p>
                </div>
                <div>
                    <img src={"https://st.hzcdn.com/fimgs/pictures/living-rooms/pool-house-and-wine-cellar-beckwith-interiors-img~f1d12b330d408701_5272-1-5c8590b-w800-h800-b2-p0.jpg"} />
                    <p className="legend">Lounge</p>
                </div>
                <div>
                    <img src={'https://st.hzcdn.com/fimgs/pictures/staircases/malinard-manor-stairwell-cravotta-interiors-img~bad146060d5d8f9a_9122-1-d0db26d-w720-h720-b2-p0.jpg'} />
                    <p className="legend">Stairs</p>
                </div>
                <div>
                    <img src={kitchen_1} />
                    <p className="legend">Kitchen</p>
                </div>
                <div>
                    <img src={bath} />
                    <p className="legend">Bath</p>
                </div>
            </Carousel>
        </Box>
        <Box style={{ maxWidth: '400px', marginTop: '8px', marginBottom: '8px'}}>
          <Text color="text100" variant="medium">Toronto Ontario, M1L7G9</Text>
          <br/>
          <br/>
          <Text color="text100" variant="medium">MLS® Number: W6742018</Text>
          <br/>
          <br/>
          <Box marginBottom="4" ><Text color="text80" style={{display: "grid"}}>Highlights</Text></Box>
        </Box>
        <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px', textAlign:'center' }} justifyContent={'center'}>
          <Card style={{ margin: '5px'}}>
            <Text color="text100" variant="large">3 Bedroom</Text>
          </Card>
          <Card style={{ margin: '5px'}}>
            <Text color="text100" variant="large">2  Bathroom</Text>
          </Card>
        </Box>
        <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px', textAlign:'center' }} justifyContent={'center'}>
          <Card style={{ margin: '5px'}}>
            <Text color="text100" variant="large">3 Storeys</Text>
          </Card>
          <Card style={{ margin: '5px'}}>
            <Text color="text100" variant="large">42 x 119.25 FT</Text>
          </Card>
          <Card style={{ margin: '5px'}}>
            <img src={remax} width={'40%'}/>
          </Card>
        </Box>
        <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px'}}>
          <Box marginBottom="4" ><Text color="text80" style={{display: "grid"}}>Description</Text></Box>
          <Card style={{ margin: '5px'}}>
            <Text color="text100" variant="small">Welcome to this enchanting Gothic-inspired home that seamlessly blends timeless elegance with modern comfort. Situated amidst lush gardens and mature trees, this exquisite 3-bedroom, 2-bathroom residence is a true masterpiece of architectural design. From the moment you step through the intricately carved wooden front doors, you'll be transported to a world of rich history and captivating charm.

            The exterior façade of the house exudes a sense of grandeur, with pointed arches, steep gabled roofs, and ornate stone detailing reminiscent of medieval Gothic architecture. The dark gray stone exterior is offset by the warm glow of antique-style lanterns that flank the entrance, casting a romantic ambiance as you approach.

            The kitchen is a modern marvel that harmoniously merges with the Gothic theme. Custom cabinetry with ornate wrought-iron hardware complements the sleek granite countertops, and a large central island serves as a gathering place for culinary creations. High-end stainless steel appliances effortlessly blend with vintage-inspired light fixtures, creating a unique and functional space for both cooking and entertaining.

            One of the most enchanting features of this home is the stunning planetarium room. A circular glass enclosure, nestled within the heart of the residence, allows you to gaze up at the night sky from the comfort of your own home. Constellations come to life as the room transforms into a celestial wonderland, creating a truly mesmerizing experience that is both educational and awe-inspiring.

            Step outside to discover a meticulously landscaped garden that complements the home's Gothic charm. Meandering pathways lead you through lush greenery, stone sculptures, and a tranquil water feature. A shaded pergola provides the ideal setting for outdoor gatherings, while a hidden garden nook invites quiet moments of reflection.

            In every corner of this remarkable home, the Gothic inspiration is evident, creating an atmosphere of timeless elegance and artistic beauty. Immerse yourself in a world where history and modernity coalesce, and experience the magic of living in a house that captures the essence of a bygone era while offering all the comforts of contemporary living.</Text>
          </Card>
        </Box>
        <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px'}}>
          <br/>
          <Box marginBottom="4" ><Text color="text80" style={{display: "grid"}}>Contact</Text></Box>
          <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px', textAlign:'center' }} justifyContent={'center'}>
            <Card style={{ margin: '5px'}}>
            <Text color="text100" variant="large">Agent Number: 12345678</Text>
            </Card>
            <Card style={{ margin: '5px'}}>
              <Text color="text100" variant="large">416-555-5555</Text>
            </Card>
            <Card style={{ margin: '5px'}}>
              <Text color="text100" variant="large">mm@horizon.io</Text>
            </Card>
          </Box>
          <br/>
        </Box>
        <br/>
        <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px'}} justifyContent={'center'}>
          <Button onClick={() => connect()} variant="primary" label='login to bid'></Button>
        </Box>
        <br/>
        <br/>
        <br/>
      </Box>
      </>
    }
    </>
  );
}

export default App;
