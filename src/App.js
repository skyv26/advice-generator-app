import React, { useState, Fragment } from 'react';
import classes from './App.module.css';
import mobileDivider from './images/pattern-divider-mobile.svg';
import desktopDivider from './images/pattern-divider-desktop.svg';

let timeVal;

function App() {

  const [currentAdvice, updateAdvice] = useState({id: 117, advice: "It is easy to sit up and take notice, what’s difficult is getting up and taking action."})
  const [isLoading, updateLoading] = useState(false);

  const timerStopper = () => {
    clearInterval(timeVal);
  }

  const generate = () => {
    updateLoading(true);
    timeVal=setInterval( () =>{
        fetch('https://api.adviceslip.com/advice')
        .then( (response) => {
          if(response.ok) {
            return response.json()
          }
          throw new Error("Something went wrong");
        }).then((data) => {
          timerStopper();
          updateAdvice(data.slip);
          updateLoading(false);
        }) 
        .catch(error => console.log(error))
    }, 4000);                                                         
  }
  return (
    <>
    <main className={classes.Main}>
      <div className={classes.AdviceContainer}>
        { isLoading ? <p className={classes.Advice}>Loading ...</p>: 
          <Fragment>
            <p className={classes.AdviceSerialNo}>advice #{currentAdvice.id}</p>
            <p className={classes.Advice}>“{currentAdvice.advice}”</p>
          </Fragment>
        }
        <img className={classes.MobileViewDivider} src={mobileDivider} alt="" />
        <img className={classes.TabViewDivider} src={desktopDivider} alt="" />
        <button className={classes.Button} onClick={generate}></button>
      </div>
    <footer className={classes.Attribution}>
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"><strong>Frontend Mentor</strong></a>. 
      Made with ❤️ by <a href="https://twitter.com/vrma_aakash"><strong>Aakash Verma</strong></a>.
    </footer>
    </main>
    </>
  );
}

export default App;