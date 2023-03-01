import React from 'react'
import '../styles/About.modules.css';
// import { useGlobalContext } from '../context/context';

const About = () => {
  // const {isDarkMode} = useGlobalContext();
  // document.body.style.backgroundColor = isDarkMode ? '#333' : 'lightgray';

  return (
    <div className='about'>
      <h1>About The Company</h1>
      <div className='about-container'>
        <p>We are all about nail care that is really centered around your wellbeing and prosperity. We’ve taken out all the awful stuff (synthetic concoctions, poisons, creature items) and left in the majority of the well done (high-sparkle complete, and durable splendid shading).</p><br/>
        <p>A new layer of clean or a trek to the salon isn’t just to serve your nails, however your brain as well. We really trust that nail care is self consideration, and you shouldn’t need to hazard your wellbeing all the while. That is the reason we make non lethal nail cleans, and experience-centered nail studios you’ll cherish investing energy in.</p><br/>
        <p>From our item recipes to our studio structure, we really esteem the significance of straightforwardness in all that we do. Regardless of whether you’re a moderate or a maximalist, there’s a certain stunner to doing things just, in light of the fact that let’s face it – life can be sufficiently entangled as of now.</p><br/>
        <p>We believe what’s most wonderful in life is simply the opportunity to be. We’re not keen on pursuing patterns, and we acknowledge and commend that there is nobody meaning of excellence – we are for the most part excellent in our very own extraordinary way.</p><br/>
      </div>
    </div>
  )
}
export default About;