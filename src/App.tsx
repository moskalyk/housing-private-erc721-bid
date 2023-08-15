import React from 'react';
import logo from './logo.svg';
import './App.css';
import house from './house.png'
import bath from './bath.png'
import remax from './remax.png'
import logo_house from './logo_house.png'
import kitchen_1 from './kitchen_1.png'
import kitchen_2 from './kitchen_2.png'

import { 
  Card,
  Text,
  Box, 
  Button,
  IconButton, 
  SunIcon, 
  MoonIcon,
  Spinner,
  useTheme } from '@0xsequence/design-system'
import {Group} from './Group'

var Carousel = require('react-responsive-carousel').Carousel;

function App() {
  const { theme, setTheme } = useTheme()
  const addresses = ['1 Eagle Rd.', '1234 Maple Street','9012 Elm Lane', '890 Cedar Court']
  const [hidden, setHidden] = React.useState(false)
  const lookups = addresses.map((address: any) => {
    return <>
      <Text color="text100" variant="large" style={{textAlign: 'left'}}>{address}</Text>
      <br/>
      <br/>
    </>
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
  }, [])

  return (
    <Box marginY="0" marginX="auto" paddingX="6" style={{ maxWidth: '720px', marginTop: '80px', marginBottom: '80px' }}>
      <Box style={{left: '11px', top: '20px', position: 'fixed'}}>
        <img src={logo_house} width={'8%'} style={{left: '10px'}}/>
        <br/>
        {hidden ? lookups : null}
      </Box>
      <Box style={{ maxWidth: '720px', marginTop: '8px', marginBottom: '8px' }}>
        <Text color="text100" variant="large">1 Eagle Rd.</Text>
        <br/>
        <br/>
        <Text color="text100" variant="large">$800,000 Listing</Text>
        <br/>
        <br/>
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
        <Button variant="primary" label='login to bid'></Button>
      </Box>
      <br/>
      <br/>
      <br/>
    </Box>
  );
}

export default App;
